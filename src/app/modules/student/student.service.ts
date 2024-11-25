import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

//  ALL THE SERIVICES OR METHODDS
const createStudentIntoDB = async (studentData: TStudent) => {
  try {
    // const result = await StudentModel.create(student); //built in static method

    const student = new StudentModel(studentData);// create an instancce
    const result = student.save(); // buit in instance methods

    if(await student.isUserExists(studentData.id)){
      throw new Error('Student already exists');
    }

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
