import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../redux/AuthenticationSlice';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newUser, setNewUser] = useState({
    user: {
      name: '',
      email: '',
      password: '',
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      user: {
        ...prevUser.user,
        [name]: value,
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(newUser))
      .then((res) => {
        if (res.payload) {
          navigate('/resorts');
        } else {
          setErrorMessage('Registration failed. ');
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        setErrorMessage('ERROR. Please try again.');
        setError(true);
      });
  };
  return (
    <>
      <div className="signup">
        <form onSubmit={handleSubmit} className="signup-form">
          <h1>Welcome to Resort Vista!</h1>
          <div>
            <input
              type="text"
              name="name"
              value={newUser.user.name}
              onChange={handleChange}
              placeholder="name"
              required
            />
            <input
              type="email"
              name="email"
              value={newUser.user.email}
              onChange={handleChange}
              placeholder="email"
              required
            />
            <input
              type="password"
              name="password"
              value={newUser.user.password}
              onChange={handleChange}
              placeholder="password"
              required
            />
            <small className={`error-message ${error ? 'visible' : 'hidden'}`}>
              {errorMessage}
            </small>
            <span>
              Already have an account?
              {' '}
              <Link to="/login">Log In and explore!</Link>
            </span>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>

    </>
  );
};
export default Signup;
