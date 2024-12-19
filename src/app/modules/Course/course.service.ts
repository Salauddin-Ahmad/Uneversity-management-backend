import mongoose from 'mongoose';
import Querybuilder from '../../builder/Querybuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constants';
import { Tcourse, TcourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

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

const updateCourseIntoDb = async (id: string, payload: Partial<Tcourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // step 1: basic course information update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(404, 'Course update failed');
    }
    // check if there is any pre requisite courses to update
    // console.log(preRequisiteCourses)
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPrerequisites = preRequisiteCourses
        .filter((elem) => elem.course && elem.isDeleted)
        .map((elem) => elem.course);

      const deletedPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPrerequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPrerequisiteCourses) {
        throw new AppError(404, 'Failed to update course!');
      }

      // filter out the new course fields

      const newPrerequisites = preRequisiteCourses
        .filter((elem) => elem.course && !elem.isDeleted)
        .map((elem) => ({ ...elem, isDeleted: false }));
      console.log('NEW:', newPrerequisites);

      const newPrerequisiteCourses = await Course.findByIdAndUpdate(id, {
        $addToset: { preRequisiteCourses: { $each: newPrerequisites } },
      });

      if (!newPrerequisiteCourses) {
        throw new AppError(404, 'Failed to update preRequisites!');
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );
      return result;

      
    }
    await  session.commitTransaction();
    await session.endSession();

  } catch (error: any) {
    await  session.abortTransaction();
    await session.endSession();
    throw new AppError(404, 'Failed to update');
  }
};

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TcourseFaculty>) => {

  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {faculties: {$each: payload}},
    }, {
      upsert: true,
      new: true,
    }
  );
 return result;
}
const removeFacultiesCourseFromDB = async (id: string, payload: Partial<TcourseFaculty>) => {

  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: {$in: payload} }
    }, {
      new: true,
    }
  );
 return result;
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  deleteCoursesfromDB,
  updateCourseIntoDb,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesCourseFromDB
  
};
