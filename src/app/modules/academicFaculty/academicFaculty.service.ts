import { TacademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createAcademicFacultyIntoDB = async (payload: TAcademicSemester) => {




  const result = await AcademicFaculty.create(payload);
  return result;
};

const getacademicFacultiesFromDb = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleacademicFacultyFromDb = async (facultyId: any) => {
  const result = await AcademicFaculty.findById({ _id: facultyId });
  return result;
};
const patchacademicFacultyFromDb = async (
  id: string,
  payload: Partial<TacademicFaculty>,
) => {
  
    const result = await AcademicFaculty.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  return result;
};

export const AcademicFacultyServices = {
   createAcademicFacultyIntoDB,
  getacademicFacultiesFromDb,
  getSingleacademicFacultyFromDb,
  patchacademicFacultyFromDb,
};
