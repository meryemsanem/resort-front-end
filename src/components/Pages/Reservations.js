import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/AuthenticationSlice';
import LoadingSpinner from './LoadingSpinner';
import './Reservations.css';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authentication);

  useEffect(() => {
    const fetchReservationsData = async (userId, authToken) => {
      try {
        setLoading(true);

        if (!authToken) {
          console.error('No authToken present');
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

        if (!response.ok) {
          console.error('Failed to fetch reservations:', response.statusText);
          return;
        }

        const data = await response.json();

        const reservationsWithFee = await Promise.all(
          data.map(async (reservation) => {
            const feeResponse = await fetch(
              `http://127.0.0.1:4000/api/v1/destinations/${reservation.destination_id}`,
            );
            const feeData = await feeResponse.json();

            return {
              ...reservation,
              fee: feeData.fee,
            };
          }),
        );

        setReservations(reservationsWithFee);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    dispatch(fetchCurrentUser())
      .then(() => {
        const authToken = sessionStorage.getItem('authToken');
        const userId = currentUser.user_id;

        fetchReservationsData(userId, authToken);
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
      });
  }, [dispatch, currentUser]);

  return (
    <div className="reservations-container">
      <h1 className="reservations-title">Reservations</h1>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          {reservations.length > 0 ? (
            <table className="reservation-table">
              <thead>
                <tr>
                  <th>Resort</th>
                  <th>Fee</th>
                  <th>Total Fee</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="destination-name">
                      {reservation.destination.name}
                    </td>
                    <td>
                      $
                      {reservation.fee}
                    </td>
                    <td>
                      $
                      {reservation.fee
                        * ((new Date(reservation.end_date)
                          - new Date(reservation.start_date))
                          / (1000 * 60 * 60 * 24))}
                    </td>
                    <td>{reservation.start_date}</td>
                    <td>{reservation.end_date}</td>
                    <td>{reservation.destination.city_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-reservations-message">No reservations.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Reservations;
