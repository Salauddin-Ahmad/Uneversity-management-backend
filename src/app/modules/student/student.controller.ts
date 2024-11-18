import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent  = async (req: Request, res: Response)=> {

    try {
        const {student: studentData} = req.body

    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: result
    })
        
    } catch (error) {
        res.status(500).json({error, message: "Failed to create student"})
    }

}


export const StudentController = {
    createStudent,
}