import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { password, student: studentData } = req.body;
      // const result = await UserService.createStudentIntoDB(password, studentData);

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
export const AcademicSemesterController = {
  createAcademicSemester,
};
