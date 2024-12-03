import { z } from "zod";

const createAcademicSemesterValidationSchema = z.object({
   name: z.enum(['Autumn', 'Summer', 'Fall']),

   
}) 


export const AcademicSemesterValidations = {
     createAcademicSemesterValidationSchema,
} 