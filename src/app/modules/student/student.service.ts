import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

//  ALL THE SERIVICES OR METHODDS

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentById = async (id: string) => {
  // const result = await StudentModel.aggregate([
  //   { $match: {id: id} }
  // ]);

  const result = await StudentModel.findOne({id})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};


const updateStudentIntoDb= async (id: string, payload: Partial<TStudent>) => {

  const {name, guardian, localGuardian,
     ...remainningStudentData} = payload;
  const mofifiedUpdatedData : Record<string, unknown> = {
    ...remainningStudentData,
  }

  if (name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      mofifiedUpdatedData[`$name${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      mofifiedUpdatedData[`$name${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      mofifiedUpdatedData[`$name${key}`] = value;
    }
  }
  console.log(mofifiedUpdatedData)
   

  const result = await StudentModel.findOneAndUpdate(
    {id},
     mofifiedUpdatedData, {
      new: true,
      runValidators: true,
     });
  return result;
};




const deleteStudentfromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {

    session.startTransaction();

    // const  studentExist = await 
    

    const deletedStudeent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {new: true}

    );

    if (!deletedStudeent) {
      throw new AppError(404,'Student not found');
    }

    const deletedUser = await User.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    )

    if (!deletedUser) {
      throw new AppError(404,'Failed to delete user');
    }


    await session.commitTransaction();
    await session.endSession();

    // return await BicycleSchema.findById(productId); // it can be used also
    return deletedStudeent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentById,
  deleteStudentfromDB,
  updateStudentIntoDb
};
