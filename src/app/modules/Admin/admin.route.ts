// import express from 'express';
// import { updateAdminValidationSchema } from './admin.validation';
// import { AdminControllers } from './admin.controller';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constants';
// import validateRequest from '../../middlewares/validateRequest';

// const router = express.Router();

// router.get(
//   '/',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   AdminControllers.getAllAdmins,
// );

// router.get(
//   '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   AdminControllers.getSingleAdmin,
// );

// router.patch(
//   '/:id',
//   auth(USER_ROLE.superAdmin),
//   validateRequest(updateAdminValidationSchema),
//   AdminControllers.updateAdmin,
// );

// router.delete(
//   '/:adminId',
//   auth(USER_ROLE.superAdmin),
//   AdminControllers.deleteAdmin,
// );

// export const AdminRoutes = router;
