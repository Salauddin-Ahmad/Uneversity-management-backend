import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constants';
import AppError from '../../errors/AppError';





const academicSemesterSchema = new Schema<TAcademicSemester>(
  
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
const isSemesterExists = await  AcademicSemester.findOne({
  name: this.name,
  year: this.year,

})

if (isSemesterExists){
  throw new AppError(404,'Academic Semester already exists');
}

})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
