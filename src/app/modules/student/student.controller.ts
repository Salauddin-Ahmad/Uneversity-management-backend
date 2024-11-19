// import { Request, Response } from "express";
// import { StudentServices } from "./student.service";

// const createStudent  = async (req: Request, res: Response)=> {

//     try {
//         const {student: studentData} = req.body

//     const result = await StudentServices.createStudentIntoDB(studentData);
//     res.status(201).json({
//         success: true,
//         message: "Student created successfully",
//         data: result
//     })
        
//     } catch (error) {
//         res.status(500).json({error, message: "Failed to create student"})
//     }

// }


// export const StudentController = {
//     createStudent,
// }


import { RequestHandler } from 'express';
import { StudentServices } from './student.service';

const createStudent: RequestHandler = async (req, res, next) => {
    try {
        const { student: studentData } = req.body;

        if (!studentData) {
            res.status(400).json({
                success: false,
                message: "Student data is required",
            });
            return;
        }

        const result = await StudentServices.createStudentIntoDB(studentData);
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: result,
        });
    } catch (error) {
        next(error); // Pass to error handler
    }
};
export const StudentController = {
    createStudent,
};
