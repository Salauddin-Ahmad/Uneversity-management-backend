
import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";


export const createfaculty = catchAsync(async (req, res) => {
  const {password, faculty } = req.body
  const newFaculty = await FacultyServices.createFaculty(
    password,
    faculty,
    
  );

  res.status(201).json({
    success: true,
    message: 'Faculty created successfully.',
    data: newFaculty,
  });
});








const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB( id );

  res.status(201).json({
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});



const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  res.status(201).json({
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB( id , faculty);

  res.status(201).json({
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const {  id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  res.status(201).json({
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

export const FacultyControllers = {
  createfaculty,
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
