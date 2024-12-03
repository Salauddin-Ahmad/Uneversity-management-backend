import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

import { createStudentValidationSchema } from '../student/student.validation';


router.post(
  '/create-users',
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
