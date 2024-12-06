import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemesterValidation';

const router = express.Router();

router.post(
  '/create-academic-semesters',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
router.get(
  '/get-academic-semesters',
  AcademicSemesterController.getAcademicSemester,
);
router.get(
  '/get-academic-semesters:id',
  AcademicSemesterController.getAcademicSemester,
);

export const AcademicSemesterRoutes = router;
