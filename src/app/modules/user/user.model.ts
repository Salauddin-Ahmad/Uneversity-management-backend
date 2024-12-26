/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model, models } from 'mongoose';
import { Tuser, UserModel } from './user.interface';
import { UserStatus } from './user.constants';
import config from '../../config';
const userSchema = new Schema<Tuser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['superAdmin', 'student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

// userSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashedPassword,
// ) {
//   return await bcrypt.compare(plainTextPassword, hashedPassword);
// };

// userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
//   passwordChangedTimestamp: Date,
//   jwtIssuedTimestamp: number,
// ) {
//   const passwordChangedTime =
//     new Date(passwordChangedTimestamp).getTime() / 1000;
//   return passwordChangedTime > jwtIssuedTimestamp;
// };

// export const User = model<Tuser, UserModel>('User', userSchema);

export const User = models.User || model<Tuser>('User', userSchema);




// import bcrypt from 'bcrypt';
// import { model, Schema } from "mongoose";
// import { Tuser } from "./user.interface";
// import config from "../../config";

// const userSchema = new Schema<Tuser>({
//     id: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//      password: {
//         type: String,
//         required: true,
//     },
//     needsPasswordChange: {
//         type: Boolean,
//         default: false,
//     },
//     role: {
//         type: String,
//         enum: ['student', 'faculty', 'admin']
//     },
//     status: {
//         type: String,
//         enum: ['in-progress', 'blocked'],
//         default: 'in-progress',

//     },
//     isDeleted: {
//         type: Boolean,
//         default: false,
//     }

// },{
// timestamps: true,
// })

// // pre saved middleware /hook : will work on create() save()
// userSchema.pre('save', async function(next){
//     console.log(this ,'pre hook: we will save the data');
//     // (auto-gen a salt and hash):
//     const user = this;
//     //hasing password and save into db
//     user.password = await
//     bcrypt.hash(
//       user.password,
//        Number(config.bcrypt_salt_rounds)
//     );
//   next();
//   })

//   // set '' in the pass field into db
//   userSchema.post('save', function(doc, next){
//     doc.password = ""
//     next();
//   })

// export const User = model<Tuser>('User', userSchema)
