import { RequestHandler } from 'express';
import { UserService } from './user.service';
const createStudent: RequestHandler = async (req, res, next) => {
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
    } catch (error : any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
      next(error); // Pass to error handler
    }
  };


  export const UserController = {
    createStudent,
  }