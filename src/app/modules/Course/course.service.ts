import { Tcourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: Tcourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find();
  return result;
};

const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const deleteCoursesfromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
     deleteCoursesfromDB,
};
