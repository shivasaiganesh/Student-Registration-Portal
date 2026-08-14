import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, List, Search, Plus, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import AddStudentModal from '../components/AddStudentModal';
import { getStudents, addStudent, deleteStudent, initDummyData } from '../store';
import type { Student } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredStudent, setHoveredStudent] = useState<Student | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await initDummyData();
      const data = await getStudents();
      setStudents(data);
    };
    loadData();
  }, []);

  const handleAdd = async (data: Omit<Student, 'id' | 'email' | 'regNo'>, photoFile?: File) => {
    await addStudent(data, photoFile);
    const updatedStudents = await getStudents();
    setStudents(updatedStudents);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(window.confirm('Are you sure you want to delete this student?')) {
      await deleteStudent(id);
      const updatedStudents = await getStudents();
      setStudents(updatedStudents);
    }
  };

  const filteredStudents = students.filter(s => {
    const matchSearch = (s.firstName + ' ' + s.lastName + ' ' + s.regNo).toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory ? s.category === filterCategory : true;
    const matchBranch = filterBranch ? s.branch === filterBranch : true;
    const matchYear = filterYear ? s.year.toString() === filterYear : true;
    return matchSearch && matchCat && matchBranch && matchYear;
  });

  return (
    <>
      <Navbar />
      <div className="page-wrapper" style={{ padding: '40px 0' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2>Admin Dashboard</h2>
          </div>

          {/* Filters Bar */}
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', background: 'var(--white)' }}>
            
            <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ paddingLeft: '40px', background: '#f5f7f6', border: 'none' }} 
                placeholder="Search by name or Reg No..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select className="form-input" style={{ width: '150px', background: '#f5f7f6', border: 'none' }} value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
              <option value="">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>

            <select className="form-input" style={{ width: '150px', background: '#f5f7f6', border: 'none' }} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>

            <select className="form-input" style={{ width: '150px', background: '#f5f7f6', border: 'none' }} value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
              <option value="">All Years</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>

            <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
              <button className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`} style={{ background: viewMode === 'grid' ? 'var(--primary-green)' : '', color: viewMode === 'grid' ? 'white' : '' }} onClick={() => setViewMode('grid')}>
                <LayoutGrid size={20} />
              </button>
              <button className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`} style={{ background: viewMode === 'list' ? 'var(--primary-green)' : '', color: viewMode === 'list' ? 'white' : '' }} onClick={() => setViewMode('list')}>
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {filteredStudents.map(student => (
                <div 
                  key={student.id} 
                  className="glass-card" 
                  style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => navigate(`/student/${student.id}`)}
                  onMouseEnter={() => setHoveredStudent(student)}
                  onMouseLeave={() => setHoveredStudent(null)}
                >
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-main)', overflow: 'hidden' }}>
                        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.firstName} ${student.lastName}&backgroundColor=0a4f31`} alt="Avatar" style={{ width: '100%' }} />
                      </div>
                      <button className="btn-icon" style={{ width: '32px', height: '32px', color: '#e74c3c' }} onClick={(e) => handleDelete(student.id, e)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h3 style={{ margin: '0 0 5px 0' }}>{student.firstName} {student.lastName}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>{student.regNo}</p>
                    
                    <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem' }}>
                      <span style={{ background: 'var(--bg-main)', padding: '4px 10px', borderRadius: '12px' }}>{student.branch}</span>
                      <span style={{ background: 'var(--bg-main)', padding: '4px 10px', borderRadius: '12px' }}>Year {student.year}</span>
                    </div>
                  </div>

                  {/* Hover Popup Effect */}
                  {hoveredStudent?.id === student.id && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(10, 79, 49, 0.95)', color: 'white',
                      padding: '24px', display: 'flex', flexDirection: 'column',
                      justifyContent: 'center', animation: 'fadeIn 0.2s ease-in-out', zIndex: 10
                    }}>
                      <h4 style={{ color: 'white', marginBottom: '10px' }}>Quick Info</h4>
                      <p style={{ fontSize: '0.9rem', margin: '5px 0' }}><b>Email:</b> {student.email}</p>
                      <p style={{ fontSize: '0.9rem', margin: '5px 0' }}><b>Phone:</b> {student.mobile}</p>
                      <p style={{ fontSize: '0.9rem', margin: '5px 0' }}><b>CGPA:</b> {student.cgpa}</p>
                      <p style={{ fontSize: '0.9rem', margin: '5px 0' }}><b>Attendance:</b> {student.attendance}%</p>
                      <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.85rem', color: 'var(--light-green)' }}>
                        Click to view full details
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="glass-panel" style={{ background: 'var(--white)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'var(--bg-main)', textAlign: 'left' }}>
                  <tr>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '500' }}>Name</th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '500' }}>Reg No</th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '500' }}>Branch</th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '500' }}>Year</th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '500' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid #eee', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => navigate(`/student/${student.id}`)} onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafa')} onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.firstName} ${student.lastName}&backgroundColor=0a4f31`} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                          <span style={{ fontWeight: '500' }}>{student.firstName} {student.lastName}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{student.regNo}</td>
                      <td style={{ padding: '16px' }}>{student.branch}</td>
                      <td style={{ padding: '16px' }}>{student.year}</td>
                      <td style={{ padding: '16px' }}>
                        <button className="btn-icon" style={{ width: '32px', height: '32px', color: '#e74c3c' }} onClick={(e) => handleDelete(student.id, e)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredStudents.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
              <h3>No students found.</h3>
            </div>
          )}

        </div>
      </div>
      
      {/* Floating Action Button for Adding Student */}
      <button 
        className="btn-primary" 
        onClick={() => setIsModalOpen(true)}
        style={{ 
          position: 'fixed', 
          bottom: '40px', 
          right: '40px', 
          borderRadius: '50%', 
          width: '60px', 
          height: '60px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 100,
          padding: 0
        }}
        title="Add New Student"
      >
        <Plus size={30} />
      </button>

      <AddStudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default Dashboard;
