import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AppLayout from "~/components/AppLayout";
import { getRegistrarProfile } from "~/DAO/registrarDAO.server";
import { paramToInt } from "~/utils/paramToInt";

type LoaderDataT = {
  registrar: Exclude<Awaited<ReturnType<typeof getRegistrarProfile>>, null>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = paramToInt(params.registrarId);
  if (id == null) {
    throw new Response("Not Found", { status: 404 });
  }

  const registrar = await getRegistrarProfile(id);
  if (!registrar) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ registrar });
};

const RegistrarDetailsPage = () => {
  const { registrar } = useLoaderData() as LoaderDataT;
  return (
    <AppLayout>
      <div>
        <h2>RegistrarDetailsPage</h2>
        <p>registrar id: {registrar?.id}</p>
        <p>registrar department: {registrar?.user.dep_id}</p>
        <p>registrar name: {registrar?.user.profile?.fullname}</p>
      </div>
    </AppLayout>
  );
};

export default RegistrarDetailsPage;