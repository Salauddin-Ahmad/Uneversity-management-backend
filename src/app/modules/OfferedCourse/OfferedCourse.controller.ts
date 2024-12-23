import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { OfferedCourseServices } from './OfferedCourse.service';


const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Offered courses retrieved successfully!',
    data: result,
  });
}
);

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Offered courses retrieved successfully!',
    data: result,
  });
}
);

const getMyOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await OfferedCourseServices.getMyOfferedCoursesFromDB(
    userId,
    req.query,
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Offered courses retrieved successfully!',
    data: result,
  });
}
);

const getSingleOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Offered courses retrieved successfully!',
      data: result,
    });
  }
);

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Offered courses retrieved successfully!',
    data: result,
  });
}
);
const deleteOfferedCourseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Offered courses retrieved successfully!',
      data: result,
    });
  }
);

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};
