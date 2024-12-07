import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester, } from './academicSemester.interface';
import { academicSemesterNameCodeMapper } from './academicSemester.constants';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.find({ _id: id });
  return result;
};
const patchAcademicSemesterFromDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid combination of name and code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(({_id: id}), payload, {
    new: true,
  });

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
  patchAcademicSemesterFromDb,
};
