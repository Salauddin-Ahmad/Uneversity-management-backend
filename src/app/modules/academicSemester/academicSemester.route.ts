import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();


router.post('/create-academic-semester', AcademicSemesterController)

export const AcademicSemesterRoutes = router;
