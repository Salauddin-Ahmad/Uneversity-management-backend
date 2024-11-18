import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.


export type Gurdian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;

    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
  }

export type Student = {
  id: string;
  name: {
    firstName: string;
    middlename: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress?: string;
  permanentAddress?: string;
  guardian: Gurdian;
};

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});
