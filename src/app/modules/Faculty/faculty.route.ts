import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema, updateFacultyValidationSchema } from './faculty.validation';
import { FacultyControllers } from './faculty.controller';


const router = express.Router();


router.post(
  '/create-facultie',
  validateRequest(createFacultyValidationSchema),
  FacultyControllers.createfaculty,
);


router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
