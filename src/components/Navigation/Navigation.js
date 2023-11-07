import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import {
  FaPause,
  FaTwitter,
  FaFacebookF,
  FaGooglePlus,
  FaPinterestP,
  FaVimeoV,
  FaCopyright,
} from 'react-icons/fa';
import { Nav } from './Nav';
import './Navigation.css';

const Navigation = () => {
  const { isOpen, toggleNavigation } = useContext(Nav);

  const handleToggle = () => {
    toggleNavigation();
  };

  return (
    <div className={`nav-menu ${isOpen ? 'open-menu' : 'close-menu'}`}>
      <button type="button" onClick={handleToggle} className="hamburger-icon">
        {isOpen ? (
          <FiX className="close" />
        ) : (
          <FaPause className="rotate-icon" />
        )}
      </button>
      {isOpen && (
        <div className="menu-links">
          <div className="logo-container">
            <h2>Logo Soon</h2>
          </div>
          <div className="links">
            <NavLink to="/resorts" onClick={handleToggle}>
              Resorts
            </NavLink>
            <NavLink to="/reserve" onClick={handleToggle}>
              Reserve
            </NavLink>
            <NavLink to="/reservations" onClick={handleToggle}>
              My Reservations
            </NavLink>
            <NavLink to="/add_resort" onClick={handleToggle}>
              Add Resort
            </NavLink>
            <NavLink to="/delete_resort" onClick={handleToggle}>
              Delete Resort
            </NavLink>
            <NavLink to="/logout" onClick={handleToggle}>
              Logout
            </NavLink>
          </div>
          <div className="footer">
            <div className="social-media">
              <FaTwitter />
              <FaFacebookF />
              <FaGooglePlus />
              <FaVimeoV />
              <FaPinterestP />
            </div>
            <div className="copyright">
              <FaCopyright />
              <span>Copyright 2023</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
