import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logIn, fetchCurrentUser } from '../redux/AuthenticationSlice';
import LoadingSpinner from '../Pages/LoadingSpinner';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newSession, setNewSession] = useState({
    user: {
      email: '',
      password: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSession((prevSession) => ({
      ...prevSession,
      user: {
        ...prevSession.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await dispatch(logIn(newSession));

      if (res.payload) {
        dispatch(fetchCurrentUser());
        setSuccessMessage('Log in successful! Please wait...');
        navigate('/resorts');
      } else {
        setErrorMessage('Incorrect email or password. Please try again.');
        setError(true);
      }
    } catch (error) {
      setErrorMessage('ERROR. Please try again.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      {isLoading && <LoadingSpinner />}
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Welcome to Resort Vista!</h1>
        <div>
          <input
            type="email"
            name="email"
            value={newSession.user.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            value={newSession.user.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          <small className={`error-message ${error ? 'visible' : ''}`}>
            {errorMessage}
          </small>
          <span className="signup-text">
            New to Resort Vista?
            {' '}
            <Link to="/signup">Join us and start exploring!</Link>
          </span>
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
