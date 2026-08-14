import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ background: location.pathname === '/' ? 'rgba(10, 79, 49, 0.95)' : 'rgba(255, 255, 255, 0.8)', borderBottom: location.pathname === '/' ? 'none' : '1px solid rgba(255,255,255,0.4)' }}>
      <Link to="/" className="nav-brand" style={{ color: location.pathname === '/' ? 'white' : 'var(--primary-green)' }}>
        {/* SVG Logo to ensure it always loads */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" style={{ height: '40px' }}>
          <text x="0" y="28" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="32" fill={location.pathname === '/' ? 'white' : 'var(--primary-green)'}>SRM</text>
          <text x="75" y="18" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="12" fill={location.pathname === '/' ? 'var(--light-green)' : 'var(--secondary-green)'}>UNIVERSITY</text>
          <text x="75" y="28" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="9" fill={location.pathname === '/' ? '#e0e0e0' : 'var(--text-muted)'}>Andhra Pradesh</text>
        </svg>
        <span style={{ marginLeft: '10px', fontSize: '1.2rem' }}>Registration Portal</span>
      </Link>
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* Removed Admin Login from top navbar as requested */}
        {location.pathname !== '/' && location.pathname !== '/login' && (
          <Link to="/" style={{ textDecoration: 'none' }} onClick={() => localStorage.removeItem('role')}>
            <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Logout</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
