import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';


const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getAllAdmins,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getSingleAdmin,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete(
  '/:adminId',
  auth(USER_ROLE.superAdmin),
  AdminControllers.deleteAdmin,
);

export const AdminRoutes = router;


