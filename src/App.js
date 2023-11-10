import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SplashScreen from './components/Pages/SplashScreen';
import Navigation from './components/Navigation/Navigation';
import Resorts from './components/Pages/Resorts';
import Reserve from './components/Pages/Reserve';
import AddResort from './components/Pages/AddResort';
import DeleteResort from './components/Pages/DeleteResort';
import Reservations from './components/Pages/Reservations';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/Pages/Logout';
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
