import type { LoaderFunction } from "@remix-run/node";
import type { ProfileModelT } from "~/DAO/userDAO.server";
import type { StudentModelT } from "~/DAO/studentDAO.server";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import AppSkeleton from "~/components/AppSkeleton";
import { getStudentProfile } from "~/DAO/studentDAO.server";
import { paramToInt } from "~/utils/paramToInt";

type LoaderData = {
  student: StudentModelT & {
    user: {
      profile: ProfileModelT | null;
      dep_id: string;
    };
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = paramToInt(params.studentId);
  if (id == null) {
    throw new Response("Not Found", { status: 404 });
  }

  const student = await getStudentProfile(id);

  if (!student) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ student });
};

const StudentDetailsPage = () => {
  const { student } = useLoaderData() as LoaderData;
  return (
    <AppSkeleton>
      <div>
        <h2>StudentDetailsPage</h2>
        <p>student id: {student.id}</p>
        <p>student department: {student.user.dep_id}</p>
        <p>student name: {student.user.profile?.name}</p>
      </div>
    </AppSkeleton>
  );
};

export default StudentDetailsPage;
