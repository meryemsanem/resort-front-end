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
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchReservationsData = async (userId, authToken) => {
      try {
        setLoading(true);
        if (!authToken) {
          return;
        }
        const response = await fetch(
          `https://resort-vista.onrender.com/api/v1/users/${userId}/reservations`,
          {
            headers: {
              Authorization: authToken,
            },
          },
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        const reservationsWithFee = await Promise.all(
          data.map(async (reservation) => {
            const feeResponse = await fetch(
              `https://resort-vista.onrender.com/api/v1/destinations/${reservation.destination_id}`,
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
        setErrorMessage('Error fetching reservations.');
      } finally {
        setLoading(false);
      }
    };
    dispatch(fetchCurrentUser()).then(() => {
      const authToken = sessionStorage.getItem('authToken');
      const userId = currentUser.user_id;
      fetchReservationsData(userId, authToken);
    });
  }, [dispatch, currentUser]);
  return (
    <div className="reservations-container">
      <h1 className="reservations-title">Reservations</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          {reservations.length > 0 ? (
            <div className="card-container2">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="card2">
                  <div className="card-info" id="card-info">
                    <h2>{reservation.destination.name}</h2>
                    <p>
                      Fee: $
                      {reservation.fee}
                    </p>
                    <p>
                      Total Fee: $
                      {reservation.fee
                        * ((new Date(reservation.end_date)
                          - new Date(reservation.start_date))
                          / (1000 * 60 * 60 * 24))}
                    </p>
                    <p>
                      Start Date:
                      {reservation.start_date}
                    </p>
                    <p>
                      End Date:
                      {reservation.end_date}
                    </p>
                    <p>
                      City:
                      {reservation.destination.city_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reservations-message">No reservations.</p>
          )}
        </>
      )}
    </div>
  );
};
export default Reservations;
