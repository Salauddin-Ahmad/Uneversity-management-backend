import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';


const getAllStudents= catchAsync(async (req, res) => {
  
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(201).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
})


const getStudentById= catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
}) 
const deleteStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentfromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
})
const updateStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const { student} = req.body;
    const result = await StudentServices.updateStudentIntoDb(studentId, student);


    res.status(200).json({
      success: true,
      message: 'Student is updated successfully',
      data: result,
    });
})


export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent
};
