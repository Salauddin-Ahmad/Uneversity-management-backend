
import mongoose from 'mongoose';

import Querybuilder from '../../builder/Querybuilder';
import { Faculty } from './faculty.model';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty, } from './faculty.interface';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';




//  const createFaculty = async (facultyData: TFaculty) => {
//   try {
//     // Check if a faculty with the same email or ID already exists
//     const existingFaculty = await Faculty.findOne({
//       $or: [{ email: facultyData.email }, { id: facultyData.id }],
//     });

//     if (existingFaculty) {
//       throw new Error('A faculty with this email or ID already exists.');
//     }

//     // Create the faculty
//     const newFaculty = new Faculty(facultyData);
//     return await newFaculty.save();
//   } catch (error) {
//     throw new Error(`Failed to create faculty: ${error.message}`);
//   }
// };

const createFaculty = async (password: string, facultyData: any) => {
  try {

    // Create a new faculty instance with hashed password and provided faculty data
    const newFaculty = await Faculty.create({
      ...facultyData, // Store the hashed password
    });

    return newFaculty;
  } catch (error) {
    throw new Error(`Failed to create faculty: ${error.message}`);
  }
};

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new Querybuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');

  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(400, 'Failed to delete faculty');
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyServices = {
  createFaculty,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
