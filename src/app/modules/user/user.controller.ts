import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, student: studentData } = req.body;

      const result = await UserServices.createStudentIntoDB(
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

  const result = await UserServices.createAdminIntoDB(
    // req.file,
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
