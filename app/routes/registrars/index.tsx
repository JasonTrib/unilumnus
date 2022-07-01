import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import AppLayout from "~/components/AppLayout";
import type { RegistrarModelT } from "~/DAO/registrarDAO.server";
import { getAllRegistrars } from "~/DAO/registrarDAO.server";

type LoaderData = {
  registrars: RegistrarModelT[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const registrars = await getAllRegistrars();
  return json({ registrars });
};

const RegistrarIndexPage = () => {
  const { registrars } = useLoaderData() as LoaderData;
  return (
    <AppLayout>
      <div>RegistrarIndexPage</div>
      <div>
        <h2>list of registrars</h2>
        {registrars.map((x) => (
          <li key={x.id}>
            <Link to={`/registrars/${x.id}`}>{x.title}</Link>
          </li>
        ))}
      </div>
    </AppLayout>
  );
};

export default RegistrarIndexPage;
