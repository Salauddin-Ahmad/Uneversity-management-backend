import { z } from 'zod';
const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be a string',
      required_error: 'Academic faculty name is required',
    }),
    academicfaculty: z.string({
      invalid_type_error: 'Academic faculty must be a string',
      required_error: 'Academic faculty is required',
    }),
  }),
});
const upateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be a string',
      required_error: 'Academic faculty name is required',
    }).optional(),
    academicfaculty: z.string({
      invalid_type_error: 'Academic faculty must be a string',
      required_error: 'Academic faculty is required',
    }).optional(),
  }),
  
});
export const academicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  upateAcademicDepartmentValidationSchema,
};
