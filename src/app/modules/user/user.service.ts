import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';

// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   try {
//     // create a user object
//     const userData: Partial<Tuser> = {};
//     //if  no password given use default password
//       userData.password = password || (config.default_password as string);
//     // set student role
//     userData.role = 'student';

//     // find academic semester info
//     const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

//     userData.id = generateStudentId(admissionSemester);

//     // create a user
//     const newUser = await User.create(userData);

//     // create a student
//         if (Object.keys(newUser).length) {
//           // set id, _id as user
//           payload.id = newUser.id; // embedding id
//           payload.user = newUser._id; //reference id

//           const newStudent = await StudentModel.create(payload);
//           return newStudent;
//         }
//         return newUser;

//     // static method
//     // if(await StudentModel.isUserExists(studentData.id)){
//     //   throw new Error('Student already exists');
//     // }
//     //built in static method
//     // const student = new StudentModel(studentData);// create an instancce
//     // const result = student.save(); // buit in instance methods
//     // if(await student.isUserExists(studentData.id)){
//     //   throw new Error('Student already exists');
//     // }

//   } catch (error) {
//     throw new Error(`Error creating student: ${error.message}`);
//   }
// };

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  try {
    const userData: Partial<Tuser> = {
      password: password || (config.default_password as string),
      role: 'student',
    };

    // Validate and find the academic semester
    const admissionSemester = await AcademicSemester.findById(
      payload.admissionSemester,
    );
    if (!admissionSemester) {
      throw new Error('Invalid admission semester ID');
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      userData.id = await generateStudentId(admissionSemester);

      // Create a user ( transaction 2)
      const newUser = await User.create([userData], { session }); // became array for using transaction

      if (!newUser.length) {
        throw new AppError(404, 'Failed to create user');
      }
      // Set student-specific fields
      payload.id = newUser[0].id; // Embedded ID
      payload.user = newUser[0]._id; // Reference ID

      // Create student (transaction -2)
      const newStudent = await StudentModel.create([payload], { session });

      if (!newStudent.length) {
        throw new AppError(404, 'Failed to create student');
      }

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
    }

    // Generate student ID
  } catch (error) {
    throw new Error(`Error creating student: ${error.message}`);
  }
};

export const UserService = {
  createStudentIntoDB,
};
