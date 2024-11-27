import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// CALLS THE CONTROLLER FUNCTIONS AFTER THE ROUTES HIT
// Create a new student

// get all students
router.get('/', StudentController.getAllStudents);
// get a single student
router.get('/:studentId', StudentController.getStudentById);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
