import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {

  const result = await StudentServices.getAllStudentsFromDB(
    req.query
  );
  res.status(201).json({
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentById(id);
  res.status(200).json({
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentfromDB(id);
  res.status(200).json({
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {student} = req.body;
  console.log(id, JSON.stringify(student));

  // const name = student?.body?.student?.name;
  // console.log(name); // { middleName: "Moga" }

  const result = await StudentServices.updateStudentIntoDb(id, student);

  res.status(200).json({
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
};
