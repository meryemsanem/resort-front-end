import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import './reservationForm.css';

const ReservationForm = () => {
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.authentication);
  const { state } = useLocation();
  const { destination } = state || {};
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:4000/api/v1/destinations',
        );
        setDestinationOptions(response.data);
      } catch (error) {
        setErrorMessage('Error.');
      }
    };
    fetchResorts();
  }, []);

  useEffect(() => {
    if (destination && destination.id) {
      setSelectedDestination(destination);
    }
  }, [destination]);
  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      const authToken = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/v1/users/${currentUser.user_id}`,
          {
            headers: { Authorization: authToken },
          },
        );
        setUsername(response.data.name);
      } catch (error) {
        setErrorMessage('Error.');
      }
    };

    if (currentUser.user_id) {
      fetchCurrentUserDetails();
    }
  }, [currentUser]);

  const handleReservationSubmit = async () => {
    const authToken = sessionStorage.getItem('authToken');
    const userId = currentUser.user_id;

    if (!selectedDestination || !startDate || !endDate || !username) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const reservationData = {
      destination_id: selectedDestination.id,
      start_date: startDate,
      end_date: endDate,
      user_id: userId,
    };

    try {
      setLoading(true);

      await axios.post(
        `http://127.0.0.1:4000/api/v1/users/${userId}/reservations`,
        reservationData,
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        },
      );

      setSuccessMessage('Reservation successful!');

      setSelectedDestination(null);
      setStartDate('');
      setEndDate('');
      setUsername('');
      setErrorMessage('');

      setTimeout(() => {
        setSuccessMessage('');
        setShouldNavigate(true);
        setLoading(false);
      }, 3000);
    } catch (error) {
      setErrorMessage('Error submitting reservation. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/reservations');
    }
  }, [shouldNavigate, navigate]);

  return (
    <div className="reservation-form-container">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {isLoading && <LoadingSpinner />}
      <h2>Reserve a Resort</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleReservationSubmit();
        }}
      >
        <div>
          <label htmlFor="destination">
            Resort - City:
            <select
              id="destination"
              value={selectedDestination ? selectedDestination.id : ''}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedOption = destinationOptions.find(
                  (option) => option.id === parseInt(selectedId, 10),
                );
                setSelectedDestination(selectedOption);
              }}
            >
              <option value="">Select a resort</option>
              {destinationOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                  {' '}
                  -
                  {option.city_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="startDate">
            Start Date:
            <input
              type="date"
              id="startDate"
              value={startDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="endDate">
            End Date:
            <input
              type="date"
              id="endDate"
              value={endDate}
              min={startDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </label>
        </div>
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default ReservationForm;
