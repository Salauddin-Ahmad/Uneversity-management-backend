import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// CALLS THE CONTROLLER FUNCTIONS AFTER THE ROUTES HIT
// Create a new student

// get all students
router.get('/', StudentController.getAllStudents);
// get a single student
router.get('/:studentId', StudentController.getStudentById);
router.patch('/:studentId',
    validateRequest(updateStudentValidationSchema),
    StudentController.updateStudent);
    
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
