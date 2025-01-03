import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: 'Courses is created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  res.status(201).json({
    success: true,
    message: 'Courses are Fetched successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res): Promise<void> => {
  const { id } = req.params;

  const result = await CourseServices.getSingleCoursesFromDB(id);

  res.status(201).json({
    success: true,
    message: 'Course is Fetched successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res): Promise<void> => {
  const { id } = req.params;

  const result = await CourseServices.deleteCoursesfromDB(id);

  res.status(201).json({
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});
const assignFacultiesWithCourse = catchAsync(
  async (req, res): Promise<void> => {
    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    );

    res.status(201).json({
      success: true,
      message: 'Course assigned successfully',
      data: result,
    });
  },
);
const removeFacultiesFromCourse = catchAsync(
  async (req, res): Promise<void> => {
    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CourseServices.removeFacultiesCourseFromDB(
      courseId,
      faculties,
    );

    res.status(201).json({
      success: true,
      message: 'Faculties removed successfully',
      data: result,
    });
  },
);

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params; // Extract `id`
  const payload = req.body;

  const result = await CourseServices.updateCourseIntoDb(id, payload);

  res.status(200).json({
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse
};
