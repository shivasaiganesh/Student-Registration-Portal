import React from 'react';
import type { Student } from '../types';

interface IDCardProps {
  student: Student;
}

const IDCard: React.FC<IDCardProps> = ({ student }) => {
  return (
    <div style={{
      width: '300px',
      height: '480px',
      background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
      borderRadius: '20px',
      boxShadow: '0 25px 50px -12px rgba(0, 74, 43, 0.25)',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #e0e0e0',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Top Header */}
      <div style={{
        background: 'var(--primary-green)',
        color: 'white',
        padding: '15px',
        textAlign: 'center',
        borderBottom: '4px solid var(--light-green)'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" style={{ height: '35px', filter: 'brightness(0) invert(1)' }}>
          <text x="0" y="28" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="32" fill="var(--primary-green)">SRM</text>
          <text x="75" y="18" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="12" fill="var(--secondary-green)">UNIVERSITY</text>
        </svg>
        <div style={{ fontSize: '10px', marginTop: '5px', letterSpacing: '1px', textTransform: 'uppercase' }}>University Andhra Pradesh</div>
      </div>

      {/* Photo Area */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{
          width: '120px',
          height: '140px',
          backgroundColor: '#e0e0e0',
          border: '3px solid var(--primary-green)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <img src={student.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${student.firstName} ${student.lastName}&backgroundColor=0a4f31`} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Details Area */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: 'var(--primary-green)' }}>{student.firstName} {student.lastName}</h3>
        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px', fontWeight: '500' }}>{student.branch} - Year {student.year}</div>
        
        <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '8px', textAlign: 'left', fontSize: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div><span style={{ color: '#888' }}>Reg No:</span><br/><b>{student.regNo}</b></div>
          <div><span style={{ color: '#888' }}>Blood:</span><br/><b>{student.bloodGroup}</b></div>
          <div><span style={{ color: '#888' }}>DOB:</span><br/><b>01/01/2004</b></div> {/* Dummy DOB since not in schema */}
          <div><span style={{ color: '#888' }}>Phone:</span><br/><b>{student.mobile}</b></div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        background: 'var(--primary-green)',
        color: 'white',
        textAlign: 'center',
        padding: '8px',
        fontSize: '0.75rem'
      }}>
        STUDENT
      </div>
    </div>
  );
};

export default IDCard;
