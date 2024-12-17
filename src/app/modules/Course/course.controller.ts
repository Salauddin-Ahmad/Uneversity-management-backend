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
  const result = await CourseServices.getAllCoursesFromDB();

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
// const patchSingleAcademicFaculty = catchAsync(
//   async (req, res) => {
//     const { id } = req.params; // Extract `id`
//     const payload = req.body; // Extract `payload`

//     const result = await CourseServices.(
//       id,
//       payload,
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Academic Faculty updated successfully',
//       data: result,
//     });
//   },
// );

export const courseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse
};
