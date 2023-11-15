import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import {
  setIsAuthenticated,
  fetchCurrentUser,
} from './components/redux/AuthenticationSlice';
import './App.css';
import SplashScreen from './components/Pages/SplashScreen';
import Navigation from './components/Navigation/Navigation';
import Destinations from './components/Pages/Destinations';
import Reserve from './components/Pages/Reserve';
import AddResort from './components/Pages/AddResort';
import DeleteResort from './components/Pages/DeleteResort';
import Reservations from './components/Pages/Reservations';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/Pages/Logout';
import ResortDetails from './components/Pages/ResortDetails';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated,
  );

  useEffect(() => {
    const isAuthenticatedFromStorage = sessionStorage.getItem('isAuthenticated') === 'true';
    dispatch(setIsAuthenticated(isAuthenticatedFromStorage));

    if (isAuthenticatedFromStorage) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);
  return (
    <div className="app-splash">
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resorts" element={<Destinations />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/add_resort" element={<AddResort />} />
        <Route path="/delete_resort" element={<DeleteResort />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/details/:id" element={<ResortDetails />} />
      </Routes>
    </div>
  );
};
export default App;
