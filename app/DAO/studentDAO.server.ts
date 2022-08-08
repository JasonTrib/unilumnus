import type { Department, Student, User } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Student as StudentModelT, StudentCourse as StudentCourseT } from "@prisma/client";

export function getAllStudents() {
  return prisma.student.findMany({});
}

export function getStudents(depId: Department["title_id"]) {
  return prisma.student.findMany({
    where: {
      user: {
        dep_id: depId,
      },
    },
  });
}

export function getStudent(id: Student["id"]) {
  return prisma.student.findUnique({
    where: { id },
  });
}

export function getStudentsProfile(depId: Department["title_id"]) {
  return prisma.student.findMany({
    where: {
      user: {
        dep_id: depId,
      },
    },
    include: {
      user: {
        select: {
          profile: true,
        },
      },
    },
  });
}

export function getStudentProfile(userId: User["id"]) {
  return prisma.student.findUnique({
    where: {
      id: userId,
    },
    include: {
      user: {
        select: {
          profile: true,
          dep_id: true,
        },
      },
    },
  });
}

export function getStudentId(userId: User["id"]) {
  return prisma.student.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
    },
  });
}
