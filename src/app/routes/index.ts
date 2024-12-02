import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        module: UserRoutes
    },
    {
        path: '/students',
        module: StudentRoutes
    }
]


moduleRoutes.forEach(({ path, module }) => {
    router.use(path, module);
}); 




export default router 