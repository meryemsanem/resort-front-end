import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SplashScreen from './components/Resort/SplashScreen';
import Navigation from './components/Navigation/Navigation';
import Resorts from './components/Resort/Resorts';
import Reserve from './components/Resort/Reserve';
import AddResort from './components/Resort/AddResort';
import DeleteResort from './components/Resort/DeleteResort';
import Reservations from './components/Resort/Reservations';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/Resort/Logout';
import { setIsAuthenticated } from './components/redux/AuthenticationSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticatedFromStorage = sessionStorage.getItem('isAuthenticated') === 'true';
    dispatch(setIsAuthenticated(isAuthenticatedFromStorage));
  }, [dispatch]);

  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated,
  );

  return (
    <div className="app-splash">
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resorts" element={<Resorts />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/add_resort" element={<AddResort />} />
        <Route path="/delete_resort" element={<DeleteResort />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;
