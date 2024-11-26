import { User } from "./user.model";

const createStudentIntoDB = async (studentData: TStudent) => {
    try {
        // static method
        // if(await StudentModel.isUserExists(studentData.id)){
        //   throw new Error('Student already exists');
        // }
      const result = await User.create(studentData); //built in static method
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

  export const UserService = {
    createStudentIntoDB,
    
  }