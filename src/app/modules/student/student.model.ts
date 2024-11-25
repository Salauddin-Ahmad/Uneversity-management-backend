import { Schema, model } from 'mongoose';
import {
  TStudent,
  TUserName,
  TGurdian,
  studentModel,
  studentMethods,
} from './student.interface';

import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    maxlength: [20, 'First name should not exceed 20 characters.'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

        return firstNameStr === value;
      },

      message: `{VALUE} is not in capitalized format`,
    },
  },

  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    maxlength: [20, 'Last name should not exceed 20 characters.'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} contains non-alphabetic characters',
    },
  },
});

const gurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

const localGurdianSchema = new Schema({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
});

const studentSchema = new Schema<TStudent, studentModel, studentMethods>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
  },
  name: userNameSchema,
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not a valid gender.',
    },
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email.',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group.',
    },
    required: [true, 'Blood group is required.'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  guardian: gurdianSchema,
  localGuardian: localGurdianSchema,
  profileImage: {
    type: String,
    required: [true, 'Profile image is required.'],
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// -----------------------Model-------------------------

studentSchema.methods.isUserExists = async function(id: string){
  const existingUser = await StudentModel.findOne({id: id});

  return existingUser

}
export const StudentModel = model<TStudent, studentModel>('Student', studentSchema);
