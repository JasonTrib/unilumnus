import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteAnnouncement, getAnnouncement } from "~/DAO/announcementDAO.server";
import { getIsProfessorLecturingCourse } from "~/DAO/composites/composites.server";
import { getCourseIdFromAnnouncement } from "~/DAO/courseDAO.server";
import { getProfessorId } from "~/DAO/professorDAO.server";
import { USER_ROLE } from "~/data/data";
import styles from "~/styles/form.css";
import { paramToInt } from "~/utils/utils";
import { logout, requireUser } from "~/utils/session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "DELETE") throw new Response("Method Not Allowed", { status: 405 });
  const annId = paramToInt(params.annId);
  if (annId == null) throw new Response("Not Found", { status: 404 });

  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  const user = await requireUser(request);
  if (user === null) return logout(request);

  const announcement = await getAnnouncement(annId);
  if (!announcement) throw new Response("Not Found", { status: 404 });
  if (announcement.course.dep_id !== user.dep_id) throw new Response("Forbidden", { status: 403 });

  switch (user.role) {
    case USER_ROLE.SUPERADMIN:
    case USER_ROLE.REGISTRAR:
      break;
    case USER_ROLE.PROFESSOR:
      const prof = await getProfessorId(user.id);
      if (!prof) throw new Error();

      const course = await getCourseIdFromAnnouncement(annId);
      if (!course) throw new Response("Not Found", { status: 404 });

      const isLecturing = await getIsProfessorLecturingCourse(prof.id, course.id);
      if (!isLecturing) throw new Response("Forbidden", { status: 403 });
      break;
    case USER_ROLE.STUDENT:
      throw new Response("Forbidden", { status: 403 });
    default:
      throw new Response("Unauthorized", { status: 401 });
  }

  await deleteAnnouncement(annId);

  const redirectTo = body.redirectTo ?? "/announcements";

  return redirect(`${redirectTo}`);
};
