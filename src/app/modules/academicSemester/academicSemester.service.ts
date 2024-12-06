import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from './academicSemester.interface';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.find(
    {_id : id,}
  );
  return result;
};
const patchAcademicSemesterFromDb = async (id: string, payload: Partial<TAcademicSemester>) => {
  const result = await AcademicSemester.findByIdAndUpdate(
    id,
    payload,
    {new: true}
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
  patchAcademicSemesterFromDb

};
