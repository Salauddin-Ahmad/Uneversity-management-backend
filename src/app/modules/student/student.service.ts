import { Student } from './student.interface';
import { StudentModel } from './student.model';

//  ALL THE SERIVICES OR METHODDS
const createStudentIntoDB = async (student: Student) => {
  try {
    const result = await StudentModel.create(student);
    return result;
  } catch (error) {
    throw new Error(`Error creating student: ${error.message}`);
  }
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentById = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  // return await BicycleSchema.findById(productId); // it can be used also 
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentById,
};
