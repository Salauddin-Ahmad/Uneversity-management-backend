// import express from 'express';
// import { SemesterRegistrationValidations } from './semesterRegistration.validation';
// import { SemesterRegistrationController } from './semesterRegistration.controller';

// const router = express.Router();

// router.post(
//   '/create-semester-registration',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   validateRequest(
//     SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationController.createSemesterRegistration,
// );

// router.get(
//   '/:id',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.faculty,
//     USER_ROLE.student,
//   ),
//   SemesterRegistrationController.getSingleSemesterRegistration,
// );

// router.patch(
//   '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   validateRequest(
//     SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationController.updateSemesterRegistration,
// );

// router.delete(
//   '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   SemesterRegistrationController.deleteSemesterRegistration,
// );

// router.get(
//   '/',
//   auth(
//     USER_ROLE.superAdmin,
//     USER_ROLE.admin,
//     USER_ROLE.faculty,
//     USER_ROLE.student,
//   ),
//   SemesterRegistrationController.getAllSemesterRegistrations,
// );

// export const semesterRegistrationRoutes = router;



import express from 'express';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.get(
  '/',
  SemesterRegistrationController.getAllSemesterRegistrations,
);

export const semesterRegistrationRoutes = router;
