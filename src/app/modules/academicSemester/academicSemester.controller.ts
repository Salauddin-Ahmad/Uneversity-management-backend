import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  

      const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
        req.body,
      )

      res.status(201).json({
        success: true,
        message: 'Academic Semester is created successfully',
        data: result,
      });
  },
);
export const AcademicSemesterController = {
  createAcademicSemester,
};
