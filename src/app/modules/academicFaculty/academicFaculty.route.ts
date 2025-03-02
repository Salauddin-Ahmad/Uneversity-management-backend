import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.cotroller';
import auth from '../../middlewares/auth';

const router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', auth(), AcademicFacultyController.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyController.getSingleacademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.patchSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
