
import { StudentModel } from './student.model';

//  ALL THE SERIVICES OR METHODDS


const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentById = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  // return await BicycleSchema.findById(productId); // it can be used also
  const result = await StudentModel.aggregate([
    { $match: {id: id} }
  ]);
  return result;
};
  


const deleteStudentfromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, {isDeleted: true});

  // return await BicycleSchema.findById(productId); // it can be used also
  return result;
};

export const StudentServices = {

  getAllStudentsFromDB,
  getSingleStudentById,
  deleteStudentfromDB
};
