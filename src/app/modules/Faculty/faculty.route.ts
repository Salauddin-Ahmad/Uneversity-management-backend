import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema, updateFacultyValidationSchema } from './faculty.validation';
import { FacultyControllers } from './faculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';


const router = express.Router();


router.post(
  '/create-facultie',
  validateRequest(createFacultyValidationSchema),
  FacultyControllers.createfaculty,
);


router.get('/:id', FacultyControllers.getSingleFaculty);
router.get('/', auth(USER_ROLE.superAdmin, USER_ROLE.admin), FacultyControllers.getAllFaculties);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.deleteFaculty);


export const FacultyRoutes = router;
