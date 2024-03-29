import type { Course, Student } from "@prisma/client";
import { prisma } from "~/db.server";

export function getStudentCourses(studentId: Student["id"]) {
  return prisma.studentCourse.findMany({
    where: {
      student_id: studentId,
    },
    include: {
      course: true,
    },
  });
}

export function getAllStudentCoursesEnrolled() {
  return prisma.studentCourse.findMany({
    where: {
      is_enrolled: true,
    },
    select: {
      student_id: true,
    },
  });
}

export function getStudentCoursesEnrolled(studentId: Student["id"]) {
  return prisma.studentCourse.findMany({
    where: {
      student_id: studentId,
      is_enrolled: true,
    },
    include: {
      course: true,
    },
    orderBy: {
      course: {
        semester: "asc",
      },
    },
  });
}

export function getStudentCoursesForGrading(courseId: Course["id"]) {
  return prisma.studentCourse.findMany({
    where: {
      course_id: courseId,
      is_enrolled: true,
    },
    include: {
      student: {
        select: {
          user_id: true,
          enrollment_year: true,
          user: {
            select: {
              username: true,
              profile: {
                select: {
                  email: true,
                  fullname: true,
                  gender: true,
                  is_public: true,
                },
              },
            },
          },
        },
      },
      course: {
        select: {
          semester: true,
        },
      },
    },
    orderBy: {
      student: {
        user_id: "asc",
      },
    },
  });
}

export function getStudentCoursesFollowing(studentId: Student["id"]) {
  return prisma.studentCourse.findMany({
    where: {
      student_id: studentId,
      is_following: true,
    },
    include: {
      course: true,
    },
  });
}

export function getStudentCoursesAnnouncements(studentId: Student["id"]) {
  return prisma.studentCourse.findMany({
    where: {
      student_id: studentId,
      is_following: true,
    },
    select: {
      course: {
        select: {
          announcements: true,
        },
      },
    },
  });
}

export function getStudentCourseAnnouncements(studentId: Student["id"], courseId: Course["id"]) {
  return prisma.studentCourse.findFirst({
    where: {
      student_id: studentId,
      course_id: courseId,
      is_following: true,
    },
    select: {
      course: {
        select: {
          announcements: true,
          title: true,
        },
      },
    },
  });
}

export function getStudentCourseFollowing(studentId: Student["id"], courseId: Course["id"]) {
  return prisma.studentCourse.findFirst({
    where: {
      student_id: studentId,
      course_id: courseId,
      is_following: true,
    },
  });
}

export function getStudentCourseAnnouncementsCount(
  studentId: Student["id"],
  courseId: Course["id"],
) {
  return prisma.studentCourse.count({
    where: {
      student_id: studentId,
      course_id: courseId,
      is_following: true,
    },
  });
}

export function getStudentCoursesRegisteredCountGivenCourse(courseId: Course["id"]) {
  return prisma.studentCourse.count({
    where: {
      course_id: courseId,
      is_enrolled: true,
    },
  });
}

export function getStudentCoursesFollowingCountGivenCourse(courseId: Course["id"]) {
  return prisma.studentCourse.count({
    where: {
      course_id: courseId,
      is_following: true,
    },
  });
}

export function getStudentCoursesRegisteredCount(studentId: Student["id"]) {
  return prisma.studentCourse.count({
    where: {
      student_id: studentId,
      is_enrolled: true,
    },
  });
}

export function getStudentCoursesFollowingCount(studentId: Student["id"]) {
  return prisma.studentCourse.count({
    where: {
      student_id: studentId,
      is_following: true,
    },
  });
}

export function assignStudentCourse(studentId: Student["id"], courseId: Course["id"]) {
  return prisma.studentCourse.upsert({
    where: {
      student_id_course_id: {
        student_id: studentId,
        course_id: courseId,
      },
    },
    update: {
      is_following: true,
      is_enrolled: true,
    },
    create: {
      student_id: studentId,
      course_id: courseId,
      is_following: true,
      is_enrolled: true,
      is_drafted: false,
    },
  });
}

export function followStudentCourse(studentId: Student["id"], courseId: Course["id"]) {
  return prisma.studentCourse.upsert({
    where: {
      student_id_course_id: {
        student_id: studentId,
        course_id: courseId,
      },
    },
    update: {
      is_following: true,
    },
    create: {
      student_id: studentId,
      course_id: courseId,
      is_following: true,
      is_enrolled: false,
      is_drafted: false,
    },
  });
}

export function unfollowStudentCourse(studentId: Student["id"], courseId: Course["id"]) {
  return prisma.studentCourse.update({
    where: {
      student_id_course_id: {
        student_id: studentId,
        course_id: courseId,
      },
    },
    data: {
      is_following: false,
    },
  });
}

export function draftStudentCourse(studentId: Student["id"], courseId: Course["id"]) {
  return prisma.studentCourse.upsert({
    where: {
      student_id_course_id: {
        student_id: studentId,
        course_id: courseId,
      },
    },
    update: {
      is_drafted: true,
    },
    create: {
      student_id: studentId,
      course_id: courseId,
      is_following: false,
      is_enrolled: false,
      is_drafted: true,
    },
  });
}

export function undraftStudentCourse(studentId: Student["id"], courseId: Course["id"]) {
  return prisma.studentCourse.update({
    where: {
      student_id_course_id: {
        student_id: studentId,
        course_id: courseId,
      },
    },
    data: {
      is_drafted: false,
    },
  });
}

export function unregisterStudentCourses(studentId: Student["id"], coursesIds: number[]) {
  return prisma.studentCourse.updateMany({
    where: {
      student_id: studentId,
      course_id: {
        in: coursesIds,
      },
    },
    data: {
      is_enrolled: false,
    },
  });
}

export function registerStudentCourses(
  studentId: Student["id"],
  coursesIds: number[],
  isFollowing = true,
) {
  return prisma.studentCourse.updateMany({
    where: {
      student_id: studentId,
      course_id: {
        in: coursesIds,
      },
    },
    data: {
      is_enrolled: true,
      is_following: isFollowing,
      is_drafted: false,
    },
  });
}

export function createAndRegisterStudentCourses(studentId: Student["id"], coursesIds: number[]) {
  return prisma.studentCourse.createMany({
    data: coursesIds.map((courseId) => ({
      student_id: studentId,
      course_id: courseId,
      is_enrolled: true,
      is_following: true,
      is_drafted: false,
    })),
    skipDuplicates: true,
  });
}

export function gradeStudentCourse(
  courseId: Course["id"],
  studentId: Student["id"],
  grade: number,
) {
  return prisma.studentCourse.updateMany({
    where: {
      course_id: courseId,
      student_id: studentId,
    },
    data: {
      grade: grade,
      latest_grading: new Date().toISOString(),
    },
  });
}
