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

export const AcademicDepartment = model<TacademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
