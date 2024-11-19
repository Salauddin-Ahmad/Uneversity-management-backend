import { Student } from "./student.interface";
import { StudentModel } from "./student.model"

// const createStudentIntoDB = async (student: Student) => {

//    const result = await StudentModel.create(student)
//    return result;

// }

const createStudentIntoDB = async (student: Student) => {
    console.log("Incoming student data:", student);
    const result = await StudentModel.create(student);
    return result;
};


export const StudentServices = {
    createStudentIntoDB
}