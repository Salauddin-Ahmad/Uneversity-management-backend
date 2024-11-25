import { Schema, model } from 'mongoose';
import {
  TStudent,
  TUserName,
  TGurdian,
  studentModel,
  // studentMethods,
} from './student.interface';

import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

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

const studentSchema = new Schema<TStudent, studentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
  },
  password: {
    type: String ,
    required: [true, 'password ID is required.'],
    unique: true,
    MaxLength: [30, 'Password must be under 30 characters']
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
  isDeleted: {
    type: Boolean,
    default: false,
  } 
},{
  toJSON: {
    virtuals: true,
  }
});

// virtual
 studentSchema.virtual('fullName').get(function() {
  return this.name.firstName +'' + this.name.middleName +'' + this.name.lastName;
});

// pre saved middleware /hook : will work on create() save()
studentSchema.pre('save', async function(next){
  console.log(this ,'pre hook: we will save the data');
  // (auto-gen a salt and hash):
  const user = this;
  //hasing password and save into db
  user.password = await 
  bcrypt.hash(
    user.password,
     Number(config.bcrypt_salt_rounds)
  );
next();
})

// query middleware 

studentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}})
  next()
});
studentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne: true}})
  next()
});
studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
  next()
});

// post savee middleware hook
studentSchema.post('save', function(doc, next){
  doc.password = ""
  next();
})


// creating a custom static  method
studentSchema.statics.isUserExists = async function(id: string) {
  const existingUser = await StudentModel.findOne({ id: id });
  return existingUser;
};

// // creating a custom instance method

// // crate an custom instance of with db and moongoose
// studentSchema.methods.isUserExists = async function(id: string){
//   const existingUser = await StudentModel.findOne({id: id});
//   return existingUser
// }



export const StudentModel = model<TStudent, studentModel>('Student', studentSchema);
