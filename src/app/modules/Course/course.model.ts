import { model, Schema } from "mongoose"
import { Tcourse, TPreRequisiteCourses } from "./course.interface"

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course:  {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
})
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
    }
})

export const Course = model<Tcourse>('Course', courseSchema)