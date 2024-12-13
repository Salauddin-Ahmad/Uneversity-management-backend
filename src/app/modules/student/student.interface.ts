import { Model, Types } from 'mongoose';
import { studentMethod, studentModel } from './student.interface';
// 1. Create an interface representing a document in MongoDB.

// export type TGurdian = {
//   fatherName: string;
//   fatherOccupation: string;
//   fatherContactNo: string;

//   motherName: string;
//   motherOccupation: string;
//   motherContactNo: string;
// };

// export type TLocalGurdian = {
//   name: string;
//   occupation: string;
//   contactNo: string;
//   address: string;
// };

// export type TUserName = {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
// };

// export type TStudent = {
//   id: string;
//   user: Types.ObjectId;
//   password: string;
//   name: TUserName;
//   gender: 'male' | 'female';
//   dateOfBirth: Date;
//   email: string;
//   contactNo?: string;
//   emergencyContactNo?: string;
//   bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
//   presentAddress?: string;
//   permanentAddress?: string;
//   guardian: TGurdian;
//   localGuardian?: TLocalGurdian;
//   profileImage?: string;
//   admissionSemester: Types.ObjectId;
//   academicDepartment?: Types.ObjectId; //
//   isDeleted: boolean;
// };


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
  middleName?: string; // Optional middle name
  lastName: string;
};

export type TStudent = {
  id: string; // Unique identifier
  user: Types.ObjectId; // Reference to User
  password: string; // Student password
  name: TUserName; // Embedded object for name
  gender: 'male' | 'female'; // Gender enumeration
  dateOfBirth: Date; // Date of birth
  email: string; // Email
  contactNo?: string; // Optional contact number
  emergencyContactNo?: string; // Optional emergency contact number
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; // Optional blood group
  presentAddress?: string; // Optional present address
  permanentAddress?: string; // Optional permanent address
  guardian: TGurdian; // Required guardian
  localGuardian?: TLocalGurdian; // Optional local guardian
  profileImage?: string; // Optional profile image
  admissionSemester: Types.ObjectId; // Reference to admission semester
  academicDepartment?: Types.ObjectId; // Reference to academic department
  isDeleted: boolean; // Soft delete flag
};

export interface studentModel extends Model<TStudent> {
  /**
   * Check if a user exists by ID
   * @param id - Student ID
   * @returns Promise resolving to a student or null
   */
  isUserExists(id: string): Promise<TStudent | null>;
}







// export interface studentModel extends Model<TStudent> {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// for creating instances
// export type studentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };
// export type studentModel = Model<
//   TStudent,
//   Record<string, never>,
//   studentMethods
// >;
