import { NextFunction, RequestHandler } from 'express';
import { UserService } from './user.service';
const createStudent: RequestHandler = async (req, res, next: NextFunction) => {
    try {
      const { password,  student: studentData } = req.body;
  
      // data validation using zod
      // const zodParsedData = studentValidationSchema.parse(studentData);
      // const {error, value} = studentValidationSchema.validate(studentData);
  
      const result = await UserService.createStudentIntoDB(password, studentData);
  
      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: result,
      });
    } catch (error) {
      next(error); // Pass to error to global handler
    }
  };


  export const UserController = {
    createStudent,
  }