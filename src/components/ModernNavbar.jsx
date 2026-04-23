import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './ModernNavbar.css';

const ModernNavbar = ({ brandName, basePath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Define Links dynamically based on the current app section
  const navLinks = [
    { title: 'Home', path: `${basePath}` },
    { title: 'About', path: `${basePath}/about` },
    { title: basePath === '/doctor' ? 'Services' : 'Activities', path: basePath === '/doctor' ? `${basePath}/services` : `${basePath}/activities` },
    { title: 'Gallery', path: `${basePath}/gallery` }
  ];

  return (
    <nav className="modern-navbar">
      <div className="container nav-content">
        <Link to={basePath} className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {basePath === '/doctor' && (
            <img 
              src="/physio-care-logo.png" 
              alt="Physio Care Logo" 
              style={{ height: '40px', objectFit: 'contain' }} 
            />
          )}
          {brandName}
        </Link>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => {
            // Add exact matching logic or startsWith logic
            const isActive = location.pathname === link.path || 
                             (link.path !== basePath && location.pathname.startsWith(link.path));
            return (
              <li key={index} className="nav-item">
                <Link 
                  to={link.path} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
