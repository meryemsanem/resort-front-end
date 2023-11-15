import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logIn, fetchCurrentUser } from '../redux/AuthenticationSlice';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
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

    try {
      const res = await dispatch(logIn(newSession));

      if (res.payload) {
        dispatch(fetchCurrentUser());
        navigate('/resorts');
      } else {
        setErrorMessage('Incorrect email or password. Please try again.');
        setError(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('ERROR. Please try again.');
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Welcome to Resort Vista!</h1>
        <div>
          <input
            type="email"
            name="email"
            value={newSession.user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={newSession.user.password}
            onChange={handleChange}
            placeholder="Password"
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
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
};

export default Login;
