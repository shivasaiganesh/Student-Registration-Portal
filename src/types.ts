export interface Student {
  id: string;
  regNo: string;
  firstName: string;
  lastName: string;
  email: string;
  personalEmail: string;
  bloodGroup: string;
  area: string;
  mobile: string;
  parentMobile: string;
  category: string;
  branch: string;
  year: number;
  semester: number;
  attendance: number;
  feesPaid: number;
  totalFees: number;
  sgpas: number[]; // Array of past semesters
  cgpa: number;
  photoUrl?: string;
}
