import Querybuilder from '../../builder/Querybuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constants';
import { Tcourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: Tcourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new Querybuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

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

// const updateCourseIntoDb = async (id: string, payload: Partial<Tcourse>) => {

//     const {preRequisiteCourses, ...courseRemainingData} =  payload;



//     // step 1: basic course information update
//     const updateBasicCourseInfo = await Course.findByIdAndUpdate(
//         id,
//         courseRemainingData,
//         { 
//             new: true,
//             runValidators: true,
//         }
//     );
//     // check if there is any pre requisite courses to update
//     console.log(preRequisiteCourses)
//     if (preRequisiteCourses && preRequisiteCourses.length > 0){
//       // filter out the deleted fields
//       const deletedPrerequisites = preRequisiteCourses.filter(elem => elem.course && elem.isDeleted).map(elem => elem.course)
     

//       const deletedPrerequisiteCourses = await Course.findByIdAndUpdate(
//         id,
//         {
//           $pull: { preRequisiteCourses: {course: {$in: deletedPrerequisites} } },
//         },
//         {
//           new: true,
//           runValidators: true,
//         },
//       ) 

//       if (!deletedPrerequisiteCourses) {
//         throw new AppError(404, 'Failed to update course!');
//       }

//     }


//     return updateBasicCourseInfo

// }
const updateCourseIntoDb = async (id: string, payload: Partial<Tcourse>) => {
  try {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    console.log("Updating basic course info...");
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true }
    );

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPrerequisites = preRequisiteCourses
        .filter((elem) => elem.course && elem.isDeleted)
        .map((elem) => elem.course);

      if (deletedPrerequisites.length > 0) {
        console.log("Performing prerequisite deletion...");
        await Course.updateOne(
          { _id: id },
          { $pull: { preRequisiteCourses: { course: { $in: deletedPrerequisites } } } }
        );
      }
    }

    console.log("Course updated successfully!");
    return updateBasicCourseInfo;
  } catch (error) {
    console.error("Error during course update:", error);
    throw new Error("Failed to update course!");
  }
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  deleteCoursesfromDB,
  updateCourseIntoDb,
};
