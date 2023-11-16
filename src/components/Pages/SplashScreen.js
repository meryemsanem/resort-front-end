import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login');
  };
  const navigateToSignup = () => {
    navigate('/signup');
  };
  return (
    <div className="splash-screen">
      <h1>Welcome to Resort Vista</h1>
      <p>Explore the best resorts with us</p>
      <button type="button" className="splashbutton" onClick={navigateToLogin}>
        Login
      </button>
      <button type="button" className="splashbutton" onClick={navigateToSignup}>
        Sign Up
      </button>
    </div>
  );
};
export default SplashScreen;
