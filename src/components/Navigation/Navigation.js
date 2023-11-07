import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlus,
  FaPinterestP,
  FaVimeoV,
  FaCopyright,
} from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (!isMobile) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`nav-menu ${isOpen ? 'open-menu' : 'close-menu'}`}>
      <button type="button" onClick={handleToggle} className="hamburger-icon">
        {isOpen ? <FiX className="close" /> : <FiMenu className="open" />}
      </button>
      {isOpen && (
        <div className="menu-links">
          <div className="logo-container">
            <h2 className="app-name">Resort Vista</h2>
          </div>
          <div className="links">
            <NavLink to="/" onClick={handleClick} activeClassName="active">
              Resorts
            </NavLink>
            <NavLink
              to="/reserve"
              onClick={handleClick}
              activeClassName="active"
            >
              Reserve
            </NavLink>
            <NavLink
              to="/reservations"
              onClick={handleClick}
              activeClassName="active"
            >
              My Reservations
            </NavLink>
            <NavLink
              to="/add_resort"
              onClick={handleClick}
              activeClassName="active"
            >
              Add Resort
            </NavLink>
            <NavLink
              to="/delete_resort"
              onClick={handleClick}
              activeClassName="active"
            >
              Delete Resort
            </NavLink>
            <NavLink
              to="/logout"
              onClick={handleClick}
              activeClassName="active"
            >
              Log out
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
