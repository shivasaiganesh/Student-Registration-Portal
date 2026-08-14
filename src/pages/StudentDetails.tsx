import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import IDCard from '../components/IDCard';
import EditStudentModal from '../components/EditStudentModal';
import { getStudentById, updateStudent, uploadStudentPhoto } from '../store';
import type { Student } from '../types';

const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    if (id) {
      getStudentById(id).then(data => {
        if (data) setStudent(data);
      });
    }
  }, [id]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && student) {
      const file = e.target.files[0];
      const newPhotoUrl = await uploadStudentPhoto(file, student.regNo);
      if (newPhotoUrl) {
        const updated = await updateStudent(student.id, { photoUrl: newPhotoUrl });
        if (updated) {
          setStudent(updated);
        }
      }
    }
  };

  const handleRemovePhoto = async () => {
    if (student) {
      const updated = await updateStudent(student.id, { photoUrl: '' });
      if (updated) {
        setStudent(updated);
      }
    }
  };

  const handleSaveEdit = async (data: Partial<Student>) => {
    if (student) {
      const updated = await updateStudent(student.id, data);
      if (updated) {
        setStudent(updated);
      }
    }
  };

  if (!student) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Student not found</h2>
        </div>
      </>
    );
  }

  const attendanceColor = student.attendance < 75 ? '#e74c3c' : 'var(--primary-green)';

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          
          <Link to="/dashboard" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '30px' }}>
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
            
            {/* Left Side: Details */}
            <div className="glass-panel" style={{ padding: '40px', background: 'var(--white)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid var(--bg-main)', paddingBottom: '10px' }}>
                <h1 style={{ margin: 0 }}>Student Profile</h1>
                {isAdmin && (
                  <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setIsEditModalOpen(true)}>
                    Edit Details
                  </button>
                )}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Name</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{student.firstName} {student.lastName}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Registration Number</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{student.regNo}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>University Email</div>
                  <div style={{ fontSize: '1.1rem' }}>{student.email}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Personal Email</div>
                  <div style={{ fontSize: '1.1rem' }}>{student.personalEmail}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Branch & Year</div>
                  <div style={{ fontSize: '1.1rem' }}>{student.branch}, Year {student.year} (Sem {student.semester})</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Category</div>
                  <div style={{ fontSize: '1.1rem' }}>{student.category}</div>
                </div>
              </div>

              <h3 style={{ marginBottom: '20px', borderBottom: '2px solid var(--bg-main)', paddingBottom: '10px' }}>Academic & Financial Status</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>CGPA</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-green)' }}>{student.cgpa}</div>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Attendance</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: attendanceColor }}>{student.attendance}%</div>
                </div>
                <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Fees Status</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: student.feesPaid >= student.totalFees ? 'var(--primary-green)' : '#f39c12', marginTop: '10px' }}>
                    ₹{student.feesPaid.toLocaleString()} / ₹{student.totalFees.toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '10px' }}>Semester wise SGPA</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {student.sgpas.map((sgpa, idx) => (
                    <div key={idx} style={{ background: 'var(--light-green)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>
                      Sem {idx + 1}: {sgpa}
                    </div>
                  ))}
                  {student.sgpas.length === 0 && <span style={{ color: 'var(--text-muted)' }}>No past records</span>}
                </div>
              </div>

            </div>

            {/* Right Side: ID Card */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <IDCard student={student} />
              
              {isAdmin && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label className="btn-secondary" style={{ cursor: 'pointer', display: 'inline-block', padding: '10px 20px', borderRadius: '8px', fontSize: '0.9rem' }}>
                    Change Photo
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                  </label>
                  {student.photoUrl && (
                    <button className="btn-secondary" style={{ padding: '10px 20px', borderRadius: '8px', color: '#e74c3c', borderColor: '#ffcdd2', fontSize: '0.9rem' }} onClick={handleRemovePhoto}>
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <EditStudentModal isOpen={isEditModalOpen} student={student} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveEdit} />
    </>
  );
};

export default StudentDetails;
