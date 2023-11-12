import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/AuthenticationSlice';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authentication);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching current user');
        await dispatch(fetchCurrentUser());

        const authToken = sessionStorage.getItem('authToken');
        console.log('Current User:', currentUser);

        const userId = currentUser.user_id;

        if (!currentUser || !currentUser.user_id) {
          console.error(
            'Invalid:',
            currentUser,
          );
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:4000/api/v1/users/${userId}/reservations`,
          {
            headers: {
              Authorization: authToken,
            },
          },
        );

        console.log('Response:', response);

        if (!response.ok) {
          console.error('Failed to fetch reservations:', response.statusText);
          return;
        }

        const data = await response.json();
        console.log('Reservations data:', data);
        console.log('User ID: ', userId);
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations data:', error);
      }
    };

    fetchData();
  }, [dispatch, currentUser]);

  return (
    <div className="reservations-container">
      <h1>Reservations</h1>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <p className="destination-name">
                Destination:
                {reservation.destination.name}
              </p>
              <p className="destination-date">
                Start Date:
                {reservation.start_date}
                <br />
                <br />
                End Date:
                {reservation.end_date}
              </p>
              <p className="destination-city">
                City:
                {reservation.destination.city_name}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations.</p>
      )}
    </div>
  );
};

export default Reservations;
