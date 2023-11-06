import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Nav = createContext();

export const NavProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav.Provider value={{ isOpen, toggleNavigation }}>{children}</Nav.Provider>
  );
};

NavProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNavigation = () => useContext(Nav);
