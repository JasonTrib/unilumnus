import type { Announcement, Course, Department } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Announcement as AnnouncementModelT } from "@prisma/client";

export function getAllAnnouncements() {
  return prisma.announcement.findMany({
    orderBy: [
      {
        created_at: "desc",
      },
    ],
    include: {
      course: true,
    },
  });
}

export function getAnnouncements(depId: Department["code_id"]) {
  return prisma.announcement.findMany({
    where: {
      course: {
        dep_id: depId,
      },
    },
    orderBy: [
      {
        created_at: "desc",
      },
    ],
    include: {
      course: true,
    },
  });
}

export function getAnnouncement(id: Announcement["id"]) {
  return prisma.announcement.findUnique({
    where: { id },
    include: {
      course: true,
    },
  });
}

export function getAnnouncementsOfCourse(courseId: Course["id"]) {
  return prisma.announcement.findMany({
    where: {
      course_id: courseId,
    },
    orderBy: [
      {
        created_at: "desc",
      },
    ],
    include: {
      course: {
        select: {
          title: true,
        },
      },
    },
  });
}

export type announcementDataT = {
  course_id: number;
  title: string;
  body: string;
};

export function createAnnouncement(data: announcementDataT) {
  return prisma.announcement.create({
    data: {
      title: data.title,
      body: data.body,
      course: {
        connect: {
          id: data.course_id,
        },
      },
    },
  });
}

export function deleteAnnouncement(id: Announcement["id"]) {
  return prisma.announcement.delete({
    where: { id },
  });
}
