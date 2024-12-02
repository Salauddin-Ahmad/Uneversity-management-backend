import { NextFunction, RequestHandler } from 'express';
import { StudentServices } from './student.service';




const catchAsync = (fn: RequestHandler) => {
return (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(error => next(error));
}

}

const getAllStudents= catchAsync(async (req, res, next) => {
  
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(201).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
})


const getStudentById= catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
}) 
const deleteStudent = catchAsync(async (req, res, next) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentfromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
})


export const StudentController = {
  getAllStudents,
  getStudentById,
  deleteStudent
};
