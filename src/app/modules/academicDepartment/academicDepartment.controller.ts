import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );

    res.status(201).json({
      success: true,
      message: 'Academic Faculty is created successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const result = await AcademicFacultyServices.getacademicFacultiesFromDb();

    res.status(201).json({
      success: true,
      message: 'Academic is Fetched successfully',
      data: result,
    });
  },
);
const getSingleacademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const {facultyId} = req.params;

    const result = 
    await AcademicFacultyServices.getSingleacademicFacultyFromDb(facultyId);

    res.status(201).json({
      success: true,
      message: 'Academic Faculty is Fetched successfully',
      data: result,
    });
  },
);
const patchSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { facultyId } = req.params; // Extract `id`
    const payload = req.body; // Extract `payload`

    const result = await AcademicFacultyServices.patchacademicFacultyFromDb(facultyId, payload);

    res.status(200).json({
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  },
);

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleacademicFaculty,
    patchSingleAcademicFaculty
};
