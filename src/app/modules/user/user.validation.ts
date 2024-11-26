import { z } from "zod";

const userValidationSchema = z.object({
    id: z.string(),
    password: z.string({
        invalid_type_error: 'password must be string'
    }).max(20,{message: 'password cannot more than 20 characters'}),
    isDeleted: z.boolean().optional().default(false),
}) 


export const UserValidation = {
    userValidationSchema,
}