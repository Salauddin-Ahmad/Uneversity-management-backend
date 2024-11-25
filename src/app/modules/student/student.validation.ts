import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name should not exceed 20 characters.')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First name must be capitalized.' },
    ),
  middleName: z.string().max(20).optional(),
  lastName: z
    .string()
    .max(20, 'Last name should not exceed 20 characters.')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name must contain only alphabetic characters.',
    }),
});

// Guardian Schema
const guardianSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required."),
  fatherOccupation: z.string().min(1, "Father's occupation is required."),
  fatherContactNo: z.string().min(1, "Father's contact number is required."),
  motherName: z.string().min(1, "Mother's name is required."),
  motherOccupation: z.string().min(1, "Mother's occupation is required."),
  motherContactNo: z.string().min(1, "Mother's contact number is required."),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required."),
  occupation: z.string().min(1, "Local guardian's occupation is required."),
  address: z.string().min(1, "Local guardian's address is required."),
  contactNo: z.string().min(1, "Local guardian's contact number is required."),
});

// Enum Definitions
const GenderEnum = z.enum(['male', 'female']);
const BloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);
const StatusEnum = z.enum(['active', 'inActive']);

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required.'),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: GenderEnum,
  dateOfBirth: z.string().min(1, 'Date of birth is required.'),
  email: z.string().email('Invalid email address.'),
  contactNo: z.string().min(1, 'Contact number is required.'),
  emergencyContactNo: z
    .string()
    .min(1, 'Emergency contact number is required.'),
  bloodGroup: BloodGroupEnum,
  presentAddress: z.string().min(1, 'Present address is required.'),
  guardian: guardianSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().min(1, 'Profile image is required.'),
  isActive: StatusEnum.default('active'),
});

export default studentValidationSchema;
