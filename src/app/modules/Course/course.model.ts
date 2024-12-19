import { model, Schema } from 'mongoose';
import {
  Tcourse,
  TcourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const courseSchema = new Schema<Tcourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Course title is required.'],
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = model<Tcourse>('Course', courseSchema);

const courseFacultySchema = new Schema<TcourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TcourseFaculty>('CourseFaculty',courseFacultySchema)