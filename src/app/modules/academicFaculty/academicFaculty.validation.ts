import { z } from 'zod';
const AcademicFacultyValidationSchema=  z.object({
    name: z.string({
        invalid_type_error: 'Academic faculty must be a string'
    }),
})


export const UserValidation = {
    AcademicFacultyValidationSchema,
}
