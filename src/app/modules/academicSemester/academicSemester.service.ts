import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester } from "./academicSemester.interface";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {

const result = await AcademicSemester.create(payload);

  return result;

}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
}