import { RequestHandler } from 'express';
import { StudentServices } from './student.service';

import Joi from 'Joi';



const createStudent: RequestHandler = async (req, res, next) => {
  try {

    // create a validation schema with joi
    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .trim()
        .max(20)
        .required()
        .custom((value, helpers) => {
          const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
          if (value !== capitalized) {
            return helpers.error('any.custom', { message: `"${value}" is not in capitalized format` });
          }
          return value;
        }),
      middlename: Joi.string().max(20).optional(),
      lastName: Joi.string()
        .max(20)
        .required()
        .pattern(/^[A-Za-z]+$/, { name: 'alphabetic characters' })
        .messages({ 'string.pattern.name': '{#label} contains non-alphabetic characters' }),
    });
    
    // Define the Guardian schema
    const guardianSchema = Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNo: Joi.string()
        .pattern(/^[0-9]{10}$/, 'valid contact number')
        .required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherContactNo: Joi.string()
        .pattern(/^[0-9]{10}$/, 'valid contact number')
        .required(),
    });
    
    // Define the Local Guardian schema
    const localGuardianSchema = Joi.object({
      name: Joi.string().required(),
      occupation: Joi.string().required(),
      address: Joi.string().required(),
      contactNo: Joi.string()
        .pattern(/^[0-9]{10}$/, 'valid contact number')
        .required(),
    });
    
    // Define the main Student schema
    const studentSchema = Joi.object({
      id: Joi.string().required(),
      name: userNameSchema.required(),
      gender: Joi.string()
        .valid('male', 'female')
        .required()
        .messages({ 'any.only': '{#label} must be "male" or "female"' }),
      dateOfBirth: Joi.string()
        .isoDate()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      contactNo: Joi.string()
        .pattern(/^[0-9]{10}$/, 'valid contact number')
        .required(),
      emergencyContactNo: Joi.string()
        .pattern(/^[0-9]{10}$/, 'valid contact number')
        .required(),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required()
        .messages({ 'any.only': '{#label} must be a valid blood group' }),
      presentAddress: Joi.string().required(),
      guardian: guardianSchema.required(),
      localGuardian: localGuardianSchema.required(),
      profileImage: Joi.string()
        .uri()
        .required(),
      isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active'),
    });

    







    const { student: studentData } = req.body;

    const {value, error} = studentSchema.validate(studentData)
    console.log(error, value)
    if (!studentData) {
      res.status(400).json({
        success: false,
        message: 'Student data is required',
      });
      return;
    }

    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};

const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(201).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error); // Pass to error handler
    res.status(500).json({
      success: true,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const getStudentById: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getStudentById,
};
