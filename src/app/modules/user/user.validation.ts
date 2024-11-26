import { z } from "zod";

const userSchema = z.object({
    id: z.string(),
    password: z.string().max(20,{message: 'password cannot more than 20 characters'}),
    needsPasswordChange: z.boolean().optional(),
    role: z.enum(['stduent', 'faculty', 'admin']),
    status: z.enum(['inprogress', 'blocked']).default('inprogress'),
    isDeleted: z.boolean().optional().default(false),
}) 