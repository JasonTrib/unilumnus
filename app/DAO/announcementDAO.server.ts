import type { Announcement } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Announcement as AnnouncementModelT } from "@prisma/client";

export function getAllAnnoucements() {
  return prisma.announcement.findMany({
    include: {
      course: true,
    },
  });
}

export function getAnnoucement(id: Announcement["id"]) {
  return prisma.announcement.findUnique({
    where: { id },
    include: {
      course: true,
    },
  });
}
