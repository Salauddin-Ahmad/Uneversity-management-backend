import { semesterRegistrationRoutes } from './../modules/SemesterRegistration/semesterRegistration.route';
import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { courseRoutes } from "../modules/Course/course.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        module: UserRoutes
    },
    {
        path: '/students',
        module: StudentRoutes
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
    
]


moduleRoutes.forEach(({ path, module }) => {
    router.use(path, module);
}); 

// moduleRoutes.forEach((route) => router.use(route.path, route.module ))




export default router 