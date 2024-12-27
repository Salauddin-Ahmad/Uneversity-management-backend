import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, student: studentData } = req.body;

      const result = await UserService.createStudentIntoDB(
        password,
        studentData,
      );

      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: result,
      });
    } catch (error) {
      next(error); // Pass to error to global handler
    }
  },
);


const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});


export const UserController = {
  createStudent,
  createAdmin,
};
