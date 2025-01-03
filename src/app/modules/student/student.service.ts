import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import Querybuilder from '../../builder/Querybuilder';
import { studentSearchableFields } from './students.constants';

//  ALL THE SERIVICES OR METHODDS

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // {email: {$regex: query.searchTerm, $optionsi i}}
  // {presentAdress: {$regex: query.searchTerm, $options}}
  // {'name.firstName': {$regex: query.searchTerm, $options}}

  // const queryObj = { ...query }; //copy
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // Filetering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((elem) => delete queryObj[elem]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // field Limitting
  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log({ fields });
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const baseQuery = StudentModel.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
  
  const studentQuery = new Querybuilder(baseQuery, query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  
  const result = await studentQuery.modelQuery;
  return result;
  
};

const getSingleStudentById = async (id: string) => {
  // const result = await StudentModel.aggregate([
  //   { $match: {id: id} }
  // ]);

  const result = await StudentModel.findById( id )
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainningStudentData } = payload;
  const mofifiedUpdatedData: Record<string, unknown> = {
    ...remainningStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      mofifiedUpdatedData[`name.${key}`] = value;
    }
  }


  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      mofifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      mofifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log('Update Payload:', payload);
  console.log('Modified Update Data:', mofifiedUpdatedData);

  try {
    const result = await StudentModel.findByIdAndUpdate(id,
      mofifiedUpdatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    console.log('Update Result:', result);
    return result;
  } catch (error) {
    console.error('Error during update:', error);
    throw error;
  }
};

const deleteStudentfromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // const  studentExist = await

    const deletedStudent = await StudentModel.findByIdAndUpdate(
       id ,
      { isDeleted: true },
      { new: true },
    );

    if (!deletedStudent) {
      throw new AppError(404, 'Student not found');
    }

    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(404, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    // return await BicycleSchema.findById(productId); // it can be used also
    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentById,
  deleteStudentfromDB,
  updateStudentIntoDb,
};
