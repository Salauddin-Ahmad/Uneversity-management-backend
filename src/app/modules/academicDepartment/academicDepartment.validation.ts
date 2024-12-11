import { z } from 'zod';
const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Academic Department name is required',
    }),
    academicDepartment: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Academic Department is required',
    }),
  }),
});
const patchAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Academic Department name is required',
    }).optional(),
    academicDepartment: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Academic Department is required',
    }).optional(),
  }),
  
});
export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  patchAcademicDepartmentValidationSchema,
};
