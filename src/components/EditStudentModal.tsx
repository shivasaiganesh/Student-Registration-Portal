import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Student } from '../types';

interface EditStudentModalProps {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onSave: (data: Partial<Student>) => void;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, student, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Student>>({});

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      year: formData.year ? Number(formData.year) : undefined,
      semester: formData.semester ? Number(formData.semester) : undefined,
    });
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
        <h2 style={{ marginBottom: '24px' }}>Edit Student Details</h2>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input type="text" name="firstName" className="form-input" required value={formData.firstName || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input type="text" name="lastName" className="form-input" required value={formData.lastName || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Personal Email</label>
            <input type="email" name="personalEmail" className="form-input" required value={formData.personalEmail || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <select name="bloodGroup" className="form-input" required value={formData.bloodGroup || ''} onChange={handleChange}>
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
            <input type="text" name="area" className="form-input" required value={formData.area || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input type="text" name="mobile" className="form-input" required value={formData.mobile || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Parent Mobile</label>
            <input type="text" name="parentMobile" className="form-input" required value={formData.parentMobile || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select name="category" className="form-input" value={formData.category || ''} onChange={handleChange}>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Branch</label>
            <select name="branch" className="form-input" value={formData.branch || ''} onChange={handleChange}>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Year</label>
            <input type="number" name="year" min="1" max="4" className="form-input" value={formData.year || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Semester</label>
            <input type="number" name="semester" min="1" max="8" className="form-input" value={formData.semester || ''} onChange={handleChange} />
          </div>
          
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '20px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
