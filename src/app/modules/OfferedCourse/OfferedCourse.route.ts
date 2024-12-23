// import express from 'express';

// const router = express.Router();

// router.get(
//   '/',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
//   OfferedCourseControllers.getAllOfferedCourses,
// );

// router.get(
//   '/my-offered-courses',
//   auth(USER_ROLE.student),
//   OfferedCourseControllers.getMyOfferedCourses,
// );

// router.get(
//   '/:id',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.faculty,
//     USER_ROLE.student,
//   ),
//   OfferedCourseControllers.getSingleOfferedCourses,
// );

// router.post(
//   '/create-offered-course',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
//   OfferedCourseControllers.createOfferedCourse,
// );

// router.patch(
//   '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
//   OfferedCourseControllers.updateOfferedCourse,
// );

// router.delete(
//   '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   OfferedCourseControllers.deleteOfferedCourseFromDB,
// );

// export const offeredCourseRoutes = router;

import express from 'express';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', OfferedCourseControllers.getAllOfferedCourses);

router.get('/my-offered-courses', OfferedCourseControllers.getMyOfferedCourses);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourseFromDB);

export const offeredCourseRoutes = router;
