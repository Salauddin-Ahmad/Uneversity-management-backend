// 1. Create an interface representing a document in MongoDB.

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;

  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress?: string;
  permanentAddress?: string;
  guardian: Gurdian;
  localGuardian: LocalGurdian;
  profileImage: string;
  isActive: 'active' | 'inActive';
};

// 2. Create a Schema corresponding to the document interface.
