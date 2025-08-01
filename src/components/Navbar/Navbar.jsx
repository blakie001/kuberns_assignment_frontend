import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Top Section */}
      <div className="navbar-top">
        <div className="navbar-left">
          <div className="logo">
            <span className="logo-text">Kuberns</span>
          </div>
        </div>
        
        <div className="navbar-center">
          <div className="search-container">
            {/* Search Icon  */}
            <div className="search-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Quick Search" 
              className="search-input"
            />
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="credits">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.75 10.75L12 21.25L21.25 10.75L12 0.75L2.75 10.75Z" fill="currentColor"/>
            </svg>
            <span className="credits-text">350</span>
            <span className="credits-label">credits left</span>
          </div>
          
          <button className="add-new-btn">
            Add New
            <span className="plus-icon">▼</span>
          </button>
          
          <button className="notification-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          
          <div className="profile">
            <div className="profile-avatar">
              <span>GT</span>
            </div>
          </div>
        </div>
      </div>



      
      {/* Bottom Section */}
      <div className="navbar-bottom">
        <div className="navbar-bottom-left">
          <div className="nav-item active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Projects</span>
          </div>
          
          <div className="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3"/>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
            <span>Datastores</span>
          </div>
        </div>
        
        <div className="navbar-bottom-right">
          <a href="#" className="nav-link">Documentation</a>
          <a href="#" className="nav-link">Support</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
