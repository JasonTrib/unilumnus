import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteCourse, getCourse } from "~/DAO/courseDAO.server";
import { USER_ROLE } from "~/data/data";
import { paramToInt } from "~/utils/utils";
import { preventUnlessHasAccess } from "~/utils/permissionUtils.server";
import { logout, requireUser } from "~/utils/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "DELETE") throw new Response("Method Not Allowed", { status: 405 });
  const courseId = paramToInt(params.courseId);
  if (courseId == null) throw new Response("Not Found", { status: 404 });

  const user = await requireUser(request);
  if (user === null) return logout(request);
  preventUnlessHasAccess(user.role, USER_ROLE.REGISTRAR);

  const course = await getCourse(courseId);
  if (!course) throw new Response("Not found", { status: 404 });
  if (course.dep_id !== user.dep_id) throw new Response("Forbidden", { status: 403 });

  await deleteCourse(courseId);

  return redirect("/courses");
};
