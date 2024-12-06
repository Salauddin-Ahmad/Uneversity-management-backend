import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

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
    
]


moduleRoutes.forEach(({ path, module }) => {
    router.use(path, module);
}); 

// moduleRoutes.forEach((route) => router.use(route.path, route.module ))




export default router 