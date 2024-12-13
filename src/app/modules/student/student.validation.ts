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
const guardianValidationSchema = z.object({
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

// Student Schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: GenderEnum,
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email address.'),
      contactNo: z.string().min(1, 'Contact number is required.'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required.'),
      bloodGroup: BloodGroupEnum,
      presentAddress: z.string().min(1, 'Present address is required.'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().min(1, 'Profile image is required.'),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});
// export const createStudentValidationSchema = z.object({
//   password: z.string().max(20),
//   student: z.object({
//     name: userNameValidationSchema,
//     gender: GenderEnum,
//     dateOfBirth: z.string().optional(),
//     email: z.string().email('Invalid email address.'),
//     contactNo: z.string().min(1, 'Contact number is required.'),
//     emergencyContactNo: z
//       .string()
//       .min(1, 'Emergency contact number is required.'),
//     bloodGroup: BloodGroupEnum,
//     presentAddress: z.string().min(1, 'Present address is required.'),
//     guardian: guardianValidationSchema,
//     localGuardian: localGuardianValidationSchema,
//     profileImage: z.string().min(1, 'Profile image is required.'),
//     admissionSemester: z.string(),
//     academicDepartment: z.string(),
//   }),
// });

// export const updateStudentValidationSchema = z.object({
//   body: z.object({
//     password: z.string().max(20).optional(), // Password can be optional
//     student: z.object({
//       name: userNameValidationSchema.optional(),
//       gender: GenderEnum,
//       dateOfBirth: z.string().optional(), // Already optional
//       email: z.string().email('Invalid email address.').optional(), // Email can be optional
//       contactNo: z.string().min(1, 'Contact number is required.').optional(), // Optional if needed
//       emergencyContactNo: z
//         .string()
//         .min(1, 'Emergency contact number is required.')
//         .optional(), // Optional if needed
//       bloodGroup: BloodGroupEnum.optional(), // Optional blood group
//       presentAddress: z.string().min(1, 'Present address is required.').optional(), // Optional if needed
//       guardian: guardianValidationSchema.optional(), // Optional guardian
//       localGuardian: localGuardianValidationSchema.optional(), // Optional local guardian
//       profileImage: z.string().min(1, 'Profile image is required.').optional(), // Optional if needed
//       admissionSemester: z.string().optional(), // Optional semester
//       academicDepartment: z.string().optional(), // Optional department
//     }),
//   }),
// }); 

export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(), // Password can be optional
    student: z
      .object({
        name: userNameValidationSchema.optional(), // Name is optional
        gender: GenderEnum.optional(), // Gender should also be optional for updates
        dateOfBirth: z.string().optional(), // Date of birth is already optional
        email: z.string().email('Invalid email address.').optional(), // Email can be optional
        contactNo: z.string().min(1, 'Contact number is required.').optional(), // Contact is optional
        emergencyContactNo: z
          .string()
          .min(1, 'Emergency contact number is required.')
          .optional(), // Emergency contact is optional
        bloodGroup: BloodGroupEnum.optional(), // Blood group is optional
        presentAddress: z.string().min(1, 'Present address is required.').optional(), // Address is optional
        guardian: guardianValidationSchema.optional(), // Guardian is optional
        localGuardian: localGuardianValidationSchema.optional(), // Local guardian is optional
        profileImage: z.string().min(1, 'Profile image is required.').optional(), // Profile image is optional
        admissionSemester: z.string().optional(), // Semester is optional
        academicDepartment: z.string().optional(), // Department is optional
      })
      .optional(), // Mark student object as optional
  }),
});



export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
