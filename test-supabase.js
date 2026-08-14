import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ehqbzmuucyxiydqjymom.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocWJ6bXV1Y3l4aXlkcWp5bW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDAyNjQsImV4cCI6MjEwMjI3NjI2NH0.hZ4aHY6Q3HdhP7yrrPpN0xecfpQnepgPGGtV7j7Hjbk'
)

async function test() {
  const newStudent = {
    firstName: "Test",
    lastName: "User",
    personalEmail: "test@example.com",
    bloodGroup: "O+",
    area: "Test Area",
    mobile: "1234567890",
    parentMobile: "0987654321",
    category: "General",
    branch: "CSE",
    year: 1,
    semester: 1,
    attendance: 0,
    feesPaid: 0,
    totalFees: 300000,
    sgpas: [],
    cgpa: 0,
    email: "test_user@srmap.edu",
    regNo: "AP230000001"
  };

  const { data, error } = await supabase
    .from('students')
    .insert([newStudent])
    .select();

  if (error) {
    console.error("SUPABASE ERROR:", error);
  } else {
    console.log("SUCCESS:", data);
  }
}

test();
