import { model, Schema } from 'mongoose';
import { TacademicDepartment } from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);


class AppError extends Error{
  public statusCode: number;
  constructor(statusCode: number, message: string,  stack: '') {
    super(message);
    this.statusCode = statusCode;
    if(stack){
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}



AcademicDepartmentSchema.pre('save', async function(next){
  const isDepartmentExist = await AcademicDepartment.findOne(
    {name: this.name}
  );
  if(isDepartmentExist ) {
    throw new Error('Department already exist');
  }
  next();
})


AcademicDepartmentSchema.pre('findOneAndUpdate', async function(next){
  const query = this.getQuery();
  const  isDepartmentExist = await AcademicDepartment.findOne(query);
  if(!isDepartmentExist) {
    throw new AppError(404,'Department does not exist!',);
  }
  next()
})



export const AcademicDepartment = model<TacademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
