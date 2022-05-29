import type { StudentCourse } from "@prisma/client";

export const studentCourses: {
  studentId: StudentCourse["student_id"];
  courseId: StudentCourse["course_id"];
  grade: StudentCourse["grade"];
  isEnrolled: StudentCourse["is_enrolled"];
  isFollowing: StudentCourse["is_following"];
}[] = [
  {
    studentId: 1,
    courseId: 2,
    grade: 8.5,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 1,
    courseId: 3,
    grade: 6,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 1,
    courseId: 5,
    grade: 3,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 1,
    courseId: 6,
    grade: 9.5,
    isEnrolled: true,
    isFollowing: false,
  },
  {
    studentId: 1,
    courseId: 8,
    grade: 6.5,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 2,
    courseId: 2,
    grade: 7,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 2,
    courseId: 3,
    grade: 8,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 2,
    courseId: 4,
    grade: null,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 2,
    courseId: 5,
    grade: 10,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 2,
    courseId: 6,
    grade: 9,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 2,
    courseId: 7,
    grade: 5,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 2,
    courseId: 8,
    grade: 5.5,
    isEnrolled: true,
    isFollowing: false,
  },
  {
    studentId: 3,
    courseId: 1,
    grade: null,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 5,
    courseId: 2,
    grade: 2,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 5,
    courseId: 3,
    grade: 6,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 5,
    courseId: 6,
    grade: 7.5,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 5,
    courseId: 7,
    grade: null,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 5,
    courseId: 8,
    grade: 8,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 6,
    courseId: 5,
    grade: null,
    isEnrolled: false,
    isFollowing: true,
  },
  {
    studentId: 6,
    courseId: 6,
    grade: null,
    isEnrolled: true,
    isFollowing: true,
  },
  {
    studentId: 6,
    courseId: 8,
    grade: null,
    isEnrolled: true,
    isFollowing: true,
  },
];
