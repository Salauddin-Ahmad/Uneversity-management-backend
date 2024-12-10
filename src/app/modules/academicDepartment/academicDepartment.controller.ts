import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
      req.body,
    );

    res.status(201).json({
      success: true,
      message: 'Academic Department is created successfully',
      data: result,
    });
  },
);

const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response): Promise<void> =>{
    const result = await AcademicDepartmentServices.getacademicDepartmentFromDb();

    res.status(201).json({
      success: true,
      message: 'Academic Deparments are Fetched successfully',
      data: result,
    });
  },
);
const getSingleacademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> =>{
    const {DepartmentId} = req.params;

    const result = 
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(DepartmentId);

    res.status(201).json({
      success: true,
      message: 'Academic Department is Fetched successfully',
      data: result,
    });
  },
);
const patchSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { DepartmentId } = req.params; // Extract `id`
    const payload = req.body; // Extract `payload`

    const result = await AcademicDepartmentServices.patchAcademicDepartmentFromDb(DepartmentId, payload);

    res.status(200).json({
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  },
);

export const AcademicDepartmentController = {
    createAcademicDepartment: createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleacademicDepartment,
    patchSingleAcademicDepartment
};
