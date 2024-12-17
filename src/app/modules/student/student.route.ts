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
router.get('/:id', StudentController.getStudentById);
router.patch('/:id',
    validateRequest(updateStudentValidationSchema),
    StudentController.updateStudent);
    
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
