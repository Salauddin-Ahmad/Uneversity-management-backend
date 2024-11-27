import { Model, Types } from 'mongoose';
import { studentMethod, studentModel } from './student.interface';
// 1. Create an interface representing a document in MongoDB.

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;

  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId()
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress?: string;
  permanentAddress?: string;
  guardian: TGurdian;
  localGuardian: TLocalGurdian;
  profileImage: string;
  isDeleted: boolean;
};







export interface studentModel extends Model<TStudent> {
 isUserExists(id: string): Promise<TStudent | null>;
}





// for creating instances
// export type studentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };
// export type studentModel = Model<
//   TStudent,
//   Record<string, never>,
//   studentMethods
// >;
