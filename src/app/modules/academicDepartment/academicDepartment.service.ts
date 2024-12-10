import { TacademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";


const createAcademicDepartmentIntoDB = async (payload: TacademicDepartment) => {




  const result = await AcademicDepartment.create(payload);
  return result;
};

const getacademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getSingleAcademicDepartmentFromDb = async (facultyId: string) => {
  const result = await AcademicDepartment.findById(facultyId );
  return result;
};
const patchAcademicDepartmentFromDb = async (
  id: string,
  payload: Partial<TacademicDepartment>,
) => {
  
    const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  return result;
};

export const AcademicDepartmentServices = {
   createAcademicDepartmentIntoDB,
  getacademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  patchAcademicDepartmentFromDb,
};
