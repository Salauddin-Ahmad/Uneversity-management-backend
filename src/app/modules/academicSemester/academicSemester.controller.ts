import { AcademicSemester } from './academicSemester.model';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
      req.body,
    );

    res.status(201).json({
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    });
  },
);

const getAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const result = await AcademicSemesterServices.getAcademicSemesterFromDb();

    res.status(201).json({
      success: true,
      message: 'Academic is Fetched successfully',
      data: result,
    });
  },
);
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const id = req.params;

    const result = await AcademicSemesterServices.getAcademicSemesterFromDb(id);

    res.status(201).json({
      success: true,
      message: 'Academic is Fetched successfully',
      data: result,
    });
  },
);
export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemester

};
