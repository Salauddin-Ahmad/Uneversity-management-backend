import Joi from 'joi';

// create a validation schema with joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom((value, helpers) => {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      if (value !== capitalized) {
        return helpers.error('any.custom', {
          message: `"${value}" is not in capitalized format`,
        });
      }
      return value;
    }),
  middleName: Joi.string().max(20).optional(),
  lastName: Joi.string()
    .max(20)
    .required()
    .pattern(/^[A-Za-z]+$/, { name: 'alphabetic characters' })
    .messages({
      'string.pattern.name': '{#label} contains non-alphabetic characters',
    }),
});

// Define the Guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string()
    .pattern(/^[0-9]{10}$/, 'valid contact number')
    .required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string()
    .pattern(/^[0-9]{10}$/, 'valid contact number')
    .required(),
});

// Define the Local Guardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  address: Joi.string().required(),
  contactNo: Joi.string()
    .pattern(/^[0-9]{10}$/, 'valid contact number')
    .required(),
});

// Define the main Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string()
    .valid('male', 'female')
    .required()
    .messages({ 'any.only': '{#label} must be "male" or "female"' }),
  dateOfBirth: Joi.string().isoDate().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string()
    .pattern(/^[0-9]{10}$/, 'valid contact number')
    .required(),
  emergencyContactNo: Joi.string()
    .pattern(/^[0-9]{10}$/, 'valid contact number')
    .required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({ 'any.only': '{#label} must be a valid blood group' }),
  presentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().uri().required(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
