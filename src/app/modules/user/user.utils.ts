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

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (
  payload: TAcademicSemester,
): Promise<string> => {
  // Find the latest student ID for the given semester

  console.log(await findlastStuentId());

  const currentId = await findlastStuentId() || (0).toString();


  // Increment the ID and pad with leading zeroes
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  // Combine year, semester code, and incremented ID
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
