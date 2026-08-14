import type { Student } from './types';
import { supabase } from './lib/supabase';

export const getStudents = async (): Promise<Student[]> => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching students:', error);
    return [];
  }
  return data || [];
};

export const generateEmail = (firstName: string, lastName: string): string => {
  const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${sanitize(firstName)}_${sanitize(lastName)}@srmap.edu`;
};

export const generateRegNo = async (): Promise<string> => {
  const { data, error } = await supabase
    .from('students')
    .select('regNo')
    .order('created_at', { ascending: false })
    .limit(1);
    
  let seq = 1;
  if (!error && data && data.length > 0) {
    const lastRegNo = data[0].regNo;
    const num = parseInt(lastRegNo.replace('AP23', ''));
    if (!isNaN(num)) {
      seq = num + 1;
    }
  }
  
  const formattedSeq = seq.toString().padStart(7, '0');
  return `AP23${formattedSeq}`;
};

export const uploadStudentPhoto = async (file: File, regNo: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${regNo}-${Date.now()}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('student-photos')
    .upload(fileName, file, { upsert: true });

  if (error) {
    console.error('Error uploading photo:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('student-photos')
    .getPublicUrl(fileName);

  return publicUrl;
};

export const addStudent = async (
  studentData: Omit<Student, 'id' | 'email' | 'regNo'>, 
  photoFile?: File
): Promise<Student | null> => {
  const email = generateEmail(studentData.firstName, studentData.lastName);
  const regNo = await generateRegNo();
  
  let photoUrl = studentData.photoUrl;
  if (photoFile) {
    const uploadedUrl = await uploadStudentPhoto(photoFile, regNo);
    if (uploadedUrl) {
      photoUrl = uploadedUrl;
    }
  }
  
  const newStudent = {
    ...studentData,
    email,
    regNo,
    photoUrl,
  };
  
  const { data, error } = await supabase
    .from('students')
    .insert([newStudent])
    .select()
    .single();
    
  if (error) {
    console.error('Error adding student:', error);
    return null;
  }
  return data;
};

export const updateStudent = async (id: string, updatedData: Partial<Student>): Promise<Student | null> => {
  const { data, error } = await supabase
    .from('students')
    .update(updatedData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating student:', error);
    return null;
  }
  return data;
};

export const deleteStudent = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting student:', error);
    return false;
  }
  return true;
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching student details:', error);
    return null;
  }
  return data;
};

export const initDummyData = async () => {
  // Check if there are any students
  const students = await getStudents();
  if (students.length === 0) {
    await addStudent({
      firstName: 'Shiva',
      lastName: 'Kumar',
      personalEmail: 'shiva.k@gmail.com',
      bloodGroup: 'O+',
      area: 'Guntur',
      mobile: '9876543210',
      parentMobile: '9876543211',
      category: 'General',
      branch: 'CSE',
      year: 2,
      semester: 4,
      attendance: 85.5,
      feesPaid: 150000,
      totalFees: 300000,
      sgpas: [8.5, 8.8, 9.0],
      cgpa: 8.7,
    });
  }
};
