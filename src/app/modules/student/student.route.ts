import  express  from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

// calls the controller fucntion
router.post('/create-student', StudentController.createStudent)

export const StudentRoutes = router;
