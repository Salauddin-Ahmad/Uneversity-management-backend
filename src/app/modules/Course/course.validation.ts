import { z } from 'zod';

const updatePreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationShcema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(updatePreRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationShcema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }).optional(),
});



const assignFacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string())
  })
});

export const CourseValidatioins = {
  createCourseValidationShcema,
  updateCourseValidationShcema,
  assignFacultiesWithCourseValidationSchema
};
