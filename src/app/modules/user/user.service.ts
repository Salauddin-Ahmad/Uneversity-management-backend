import config from '../../config';
import { TStudent } from '../student/student.interface';
import { NewUSer, Tuser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  try {
    // create a user object
    const userData: Partial<Tuser> = {};
    //if  no password given use default password
      userData.password = password || (config.default_password as string);
    // set student role
    userData.role = 'student';
    // set manually geenrated id
    userData.id = '2030100001';
    // create a user
    const newUser = await User.create(userData);
    
    // create a student
        if (Object.keys(newUser).length) {
          // set id, _id as user
          studentData.id = newUser.id; // embedding id
          studentData.user = newUser._id; //reference id
          
          const newStudent = await Student.create(studentData);
          return newStudent;
        }
        return newUser;
    
    // static method
    // if(await StudentModel.isUserExists(studentData.id)){
    //   throw new Error('Student already exists');
    // }
    //built in static method
    // const student = new StudentModel(studentData);// create an instancce
    // const result = student.save(); // buit in instance methods
    // if(await student.isUserExists(studentData.id)){
    //   throw new Error('Student already exists');
    // }


    return newUser;
  } catch (error) {
    throw new Error(`Error creating student: ${error.message}`);
  }
};

export const UserService = {
  createStudentIntoDB,
};
