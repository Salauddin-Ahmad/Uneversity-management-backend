import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findlastStuentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  ).sort({
    createdAt: -1,
  });

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (
  payload: TAcademicSemester,
): Promise<string> => {
  // Find the latest student ID for the given semester



  let currentId = (0).toString(); // 0000 by default

  const lastStudentId = await findlastStuentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
  const lastStudentYear = lastStudentId?.substring(0, 4) //2030
  const currentSmesterCode = payload.code;
  const currentYear = payload.year;


  if (lastStudentId && lastStudentSemesterCode ===currentSmesterCode && lastStudentYear === currentYear ) {
    currentId =  lastStudentId.substring(6)

  }

  // Increment the ID and pad with leading zeroes
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  // Combine year, semester code, and incremented ID
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
