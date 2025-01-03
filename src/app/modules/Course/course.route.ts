import express from 'express';
import { CourseValidatioins } from './course.validation';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();
router.post(
  '/create-course',
  validateRequest(CourseValidatioins.createCourseValidationShcema),
  courseControllers.createCourse,
);

router.get('/:id', courseControllers.getSingleCourse);
router.get('/', courseControllers.getAllCourses);
router.delete('/:id', courseControllers.deleteCourse);

router.patch(
  '/:id',
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
  validateRequest(CourseValidatioins.facultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);
export const courseRoutes = router;
