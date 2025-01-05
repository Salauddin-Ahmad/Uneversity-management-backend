import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { USER_ROLE } from './user.constants';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-students', auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  // upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
);



export const UserRoutes = router;
