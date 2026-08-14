import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Student } from '../types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<Student, 'id' | 'email' | 'regNo'>, photoFile?: File) => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    personalEmail: '',
    bloodGroup: '',
    area: '',
    mobile: '',
    parentMobile: '',
    category: 'General',
    branch: 'CSE',
    year: 1,
    semester: 1,
    attendance: 0,
    feesPaid: 0,
    totalFees: 300000,
    sgpas: '',
    cgpa: 0,
    photoUrl: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      year: Number(formData.year),
      semester: Number(formData.semester),
      attendance: Number(formData.attendance),
      feesPaid: Number(formData.feesPaid),
      totalFees: Number(formData.totalFees),
      cgpa: Number(formData.cgpa),
      sgpas: formData.sgpas ? formData.sgpas.split(',').map(s => Number(s.trim())).filter(s => !isNaN(s)) : [],
    }, photoFile || undefined);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass-panel" style={{
        width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto',
        padding: '30px', position: 'relative', background: 'var(--white)'
      }}>
        <button className="btn-icon" onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <X size={20} />
        </button>
        <h2 style={{ marginBottom: '24px' }}>Add New Student</h2>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input type="text" name="firstName" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Student Photo</label>
            <input type="file" accept="image/*" className="form-input" onChange={handlePhotoUpload} />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input type="text" name="lastName" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Personal Email</label>
            <input type="email" name="personalEmail" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <select name="bloodGroup" className="form-input" required onChange={handleChange}>
              <option value="">Select...</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Area (City/Town)</label>
            <input type="text" name="area" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input type="text" name="mobile" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Parent Mobile</label>
            <input type="text" name="parentMobile" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select name="category" className="form-input" onChange={handleChange}>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Branch</label>
            <select name="branch" className="form-input" onChange={handleChange}>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>


          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '20px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Student</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
