import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import AppLayout from "~/components/AppLayout";
import type { ProfessorModelT } from "~/DAO/professorDAO.server";
import { getAllProfessors } from "~/DAO/professorDAO.server";

type LoaderData = {
  professors: ProfessorModelT[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const professors = await getAllProfessors();
  return json({ professors });
};

const ProfessorsIndexPage = () => {
  const { professors } = useLoaderData() as LoaderData;
  return (
    <AppLayout>
      <div>ProfessorsIndexPage</div>
      <div>
        <h2>list of professors</h2>
        <ul>
          {professors.map((x) => (
            <li key={x.id}>
              <Link to={`/professors/${x.id}`}>{x.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};

export default ProfessorsIndexPage;
