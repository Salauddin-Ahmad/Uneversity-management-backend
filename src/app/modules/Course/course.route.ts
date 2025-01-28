import express from 'express';
import { CourseValidatioins } from './course.validation';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();
router.post(
  '/create-course',
  auth('admin'),
  validateRequest(CourseValidatioins.createCourseValidationShcema),
  courseControllers.createCourse,
);

router.get('/:id',auth('admin', 'faculty', 'student'), courseControllers.getSingleCourse);
router.get('/', courseControllers.getAllCourses);
router.delete('/:id', courseControllers.deleteCourse);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidatioins.updateCourseValidationShcema),
  courseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidatioins.facultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(CourseValidatioins.facultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);
export const courseRoutes = router;
