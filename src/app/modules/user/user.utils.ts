// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

  // year semstercode 4 digit number
//  export const generateStudentId = (payload: TAcademicSemester) => {
//     const currentId = (0).toString();

//     let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//     incrementId = `${payload.year}${payload.code}${incrementId}`;

//     return incrementId;
//  };

import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

export const generateStudentId = async (payload: TAcademicSemester): Promise<string> => {
  // Find the latest student ID for the given semester
  const latestStudent = await User.findOne({ role: 'student' })
    .sort({ id: -1 }) // Sort in descending order of ID
    .lean();

  // Extract the current ID or initialize as "0000"
  const currentId = latestStudent?.id
    ? latestStudent.id.slice(-4) // Extract the last 4 digits
    : "0000";

  // Increment the ID and pad with leading zeroes
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  // Combine year, semester code, and incremented ID
  const studentId = `${payload.year}${payload.code}${incrementId}`;

  return studentId;
};
