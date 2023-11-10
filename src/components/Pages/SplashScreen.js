import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      <button type="button" onClick={navigateToLogin}>
        Login
      </button>
      <button type="button" onClick={navigateToSignup}>
        Sign Up
      </button>
    </div>
  );
};
export default SplashScreen;
