import express, { NextFunction } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(`i am a shena bahini`);


    // data validation using zod
    const zodParsedData = await schema.parseAsync({
        body: req.body,
    });

    // const {error, value} = studentValidationSchema.validate(studentData);

    next();
  };
};

router.post(
  '/create-users',
  validateRequest('validate'),
  UserController.createStudent,
);

export const UserRoutes = router;
