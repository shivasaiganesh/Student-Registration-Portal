import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import Navbar from '../components/Navbar';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('role', 'admin');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password (Hint: admin/admin)');
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '40px', position: 'relative', zIndex: 10 }}>
          
          {/* Decorative elements behind card */}
          <div style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'var(--light-green)', filter: 'blur(40px)', top: '-50px', right: '-50px', zIndex: -1, opacity: 0.6 }}></div>
          <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'var(--primary-green)', filter: 'blur(50px)', bottom: '-80px', left: '-80px', zIndex: -1, opacity: 0.4 }}></div>

          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" style={{ height: '60px', marginBottom: '16px', display: 'inline-block' }}>
              <text x="0" y="28" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="32" fill="var(--primary-green)">SRM</text>
              <text x="75" y="18" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="12" fill="var(--secondary-green)">UNIVERSITY</text>
              <text x="75" y="28" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="9" fill="var(--text-muted)">Andhra Pradesh</text>
            </svg>
            <h2>Admin Login</h2>
            <p style={{ color: 'var(--text-muted)' }}>Secure portal access</p>
          </div>

          <form onSubmit={handleLogin}>
            {error && <div style={{ color: '#e74c3c', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
            
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ paddingLeft: '40px' }} 
                  placeholder="Enter username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '30px' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="form-input" 
                  style={{ paddingLeft: '40px' }} 
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
              Login to Portal
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
