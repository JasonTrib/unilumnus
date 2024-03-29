import { redirect } from "@remix-run/node";
import type { UserModelT } from "~/DAO/userDAO.server";
import { USER_ROLE } from "~/data/data";

const ACCESS_MAP = {
  [USER_ROLE.SUPERADMIN]: 1,
  [USER_ROLE.REGISTRAR]: 2,
  [USER_ROLE.PROFESSOR]: 3,
  [USER_ROLE.STUDENT]: 4,
};

export const preventUnlessHasAccess = (
  userRole: UserModelT["role"],
  accessRole?: UserModelT["role"],
  redirectTo?: string,
) => {
  accessRole ??= USER_ROLE.STUDENT;
  if (!ACCESS_MAP[accessRole]) throw new Error();
  if (!ACCESS_MAP[userRole]) throw new Response("Unauthorized", { status: 401 });
  if (ACCESS_MAP[userRole] > ACCESS_MAP[accessRole]) {
    if (redirectTo) throw redirect(redirectTo);
    throw new Response("Forbidden", { status: 403 });
  }
};
