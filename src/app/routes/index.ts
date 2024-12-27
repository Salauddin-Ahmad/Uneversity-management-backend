import { semesterRegistrationRoutes } from './../modules/SemesterRegistration/semesterRegistration.route';
import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { courseRoutes } from '../modules/Course/course.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { offeredCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
// import { AdminRoutes } from '../modules/Admin/admin.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    module: UserRoutes,
  },
  {
    path: '/students',
    module: StudentRoutes,
  },
  // {
  //   path: '/admins',
  //   route: AdminRoutes,
  // },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/academic-semesters',
    module: AcademicSemesterRoutes,
  },

  {
    path: '/academic-faculties',
    module: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    module: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    module: courseRoutes,
  },
  {
    path: '/faculty',
    module: FacultyRoutes,
  },

  {
    path: '/semester-registrations',
    module: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    module: offeredCourseRoutes,
  },
];

moduleRoutes.forEach(({ path, module }) => {
  if (module){
    router.use(path, module)
  }
} );

// moduleRoutes.forEach((route) => router.use(route.path, route.module ))

export default router;
