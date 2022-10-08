import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Container from "~/components/Container";
import DepartmentsList from "~/components/departments/DepartmentsList";
import CogIcon from "~/components/icons/CogIcon";
import Page from "~/components/layout/Page";
import {
  getDepartmentExtended,
  getOtherDepartmentsExtended,
} from "~/DAO/composites/composites.server";
import type { UserModelT } from "~/DAO/userDAO.server";
import { USER_ROLE } from "~/data/data";
import { bc_deps_id } from "~/utils/breadcrumbs";
import { logout, requireUser } from "~/utils/session.server";

type LoaderDataT = {
  breadcrumbData: Awaited<ReturnType<typeof bc_deps_id>>;
  department: Exclude<Awaited<ReturnType<typeof getDepartmentExtended>>, null>;
  otherDepartments: Awaited<ReturnType<typeof getOtherDepartmentsExtended>>;
  userRole: UserModelT["role"];
  isSameDepartment: boolean;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const depId = params.depId;
  if (!depId) {
    throw new Response("Not Found", { status: 404 });
  }

  const user = await requireUser(request);
  if (user === null) return logout(request);

  const department = await getDepartmentExtended(depId);
  if (!department) {
    throw new Response("Not Found", { status: 404 });
  }
  const otherDepartments = await getOtherDepartmentsExtended(depId);
  const isSameDepartment = depId === user.dep_id;

  const path = new URL(request.url).pathname;
  const breadcrumbData = await bc_deps_id(path);

  return json({
    breadcrumbData,
    department,
    otherDepartments,
    userRole: user.role,
    isSameDepartment,
  });
};

const DepartmentDetailsPage = () => {
  const { breadcrumbData, department, otherDepartments, userRole, isSameDepartment } =
    useLoaderData() as LoaderDataT;

  const isPriviledged = userRole === USER_ROLE.SUPERADMIN || userRole === USER_ROLE.REGISTRAR;

  const headingActions = (): JSX.Element | null => {
    return isPriviledged && isSameDepartment ? (
      <span className="svg-link">
        <Link to="edit">
          <CogIcon />
        </Link>
      </span>
    ) : null;
  };

  return (
    <Page wide breadcrumbs={breadcrumbData} Actions={headingActions()}>
      <div className="department-container">
        {department.description && (
          <>
            <div className="heading">
              <h3>Description</h3>
            </div>
            <div className="description">{department.description}</div>
          </>
        )}
        <div className="profile-info-section section-separator">
          <div className="info-list">
            <div className="field font-300">Code</div>
            <div className="field">{department.code_id}</div>
            <div className="field font-300">Address</div>
            {department.address ? (
              <div className="field link">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    department.address,
                  )}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {`${department.address} ↗`}
                </a>
              </div>
            ) : (
              <div className="field">{"-"}</div>
            )}
            <div className="field font-300">Email</div>
            {department.email ? (
              <div className="field link">
                <a href={`mailto:${department.email}`}>{department.email}</a>
              </div>
            ) : (
              <div className="field link">{"-"}</div>
            )}
            <div className="field font-300">Phone</div>
            {department.telephone ? (
              <div className="field link">
                <a href={`tel:+30${department.telephone}`}>{department.telephone}</a>
              </div>
            ) : (
              <div className="field link">{"-"}</div>
            )}
            <div className="field font-300">Founded</div>
            {department.foundation_date ? (
              <div className="field">{new Date(department.foundation_date).getFullYear()}</div>
            ) : (
              <div className="field">{"-"}</div>
            )}
          </div>
        </div>
        <div className="profile-info-section">
          <div className="info-list">
            <div className="field font-300 link-simple">
              {isSameDepartment ? <Link to="/users">Users ↗</Link> : "Users"}
            </div>
            <div className="field">{department.users}</div>
            <div className="field font-300 link-simple">
              {isSameDepartment ? <Link to="/courses">Courses ↗</Link> : "Courses"}
            </div>
            <div className="field">{department.courses}</div>
          </div>
        </div>
      </div>
      <></>
      <>
        {otherDepartments.length > 0 && (
          <Container data={otherDepartments} title="Other Departments">
            <DepartmentsList />
          </Container>
        )}
      </>
    </Page>
  );
};

export default DepartmentDetailsPage;
