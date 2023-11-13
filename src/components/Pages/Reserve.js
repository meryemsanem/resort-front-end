import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ReservationForm = () => {
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [username, setUsername] = useState('');
  const currentUser = useSelector((state) => state.authentication);
  const { state } = useLocation();
  const { destination } = state || {};
  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:4000/api/v1/destinations',
        );
        setDestinationOptions(response.data);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      }
    };
    fetchResorts();
  }, []);
  useEffect(() => {
    // Autofill destination if available in location state
    if (destination) {
      setSelectedDestination(destination);
    }
  }, [destination]);
  useEffect(() => {
    // Fetch and autofill username with current user's name
    const fetchCurrentUser = async () => {
      const authToken = sessionStorage.getItem('authToken');
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/v1/users/${currentUser.user_id}`,
          {
            headers: {
              Authorization: authToken,
            },
          },
        );
        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (currentUser.user_id) {
      fetchCurrentUser();
    }
  }, [currentUser]);
  const handleReservationSubmit = async () => {
    const authToken = sessionStorage.getItem('authToken');
    const userId = currentUser.user_id;
    if (!selectedDestination || !startDate || !endDate || !username) {
      console.error('Please fill in all fields');
      return;
    }
    const reservationData = {
      destination_id: selectedDestination.id,
      start_date: startDate,
      end_date: endDate,
      user_id: userId,
    };
    console.log('Reservation Data:', reservationData);
    try {
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
      setSelectedDestination(null);
      setStartDate('');
      setEndDate('');
      setUsername('');
    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };
  return (
    <div className="reservation-form-container">
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
                  {' '}
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
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
};
export default ReservationForm;
