import { Request, Response } from 'express';
import { SemesterRegistrationService } from './semesterRegistration.service';
import catchAsync from '../../utils/catchAsync';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );

      res.status(201).json({
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
      });
    },
  );

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query,
      );

      res.status(201).json({
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
      });
    },
  );

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(
        id,
      );

      res.status(201).json({
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
      });
    },
  );

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );

      res.status(201).json({
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
      });
    },
  );

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);

      res.status(201).json({
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
      });
    },
  );

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
