import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

//  ALL THE SERIVICES OR METHODDS
const createStudentIntoDB = async (studentData: TStudent) => {
  try {

      // static method
      if(await StudentModel.isUserExists(studentData.id)){
        throw new Error('Student already exists');
      }

    const result = await StudentModel.create(studentData); //built in static method

  
  
  
  
  
  
  
  
  
    // const student = new StudentModel(studentData);// create an instancce
    // const result = student.save(); // buit in instance methods

    // if(await student.isUserExists(studentData.id)){
    //   throw new Error('Student already exists');
    // }





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
const deleteStudentfromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, {isDeleted: true});

  // return await BicycleSchema.findById(productId); // it can be used also
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentById,
  deleteStudentfromDB
};
