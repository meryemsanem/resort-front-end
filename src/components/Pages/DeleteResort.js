import React, { useEffect, useState } from 'react';
import './DeleteResort.css';

const DeleteResort = () => {
  const [destinations, setDestinations] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/v1/destinations');
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      setErrorMessage('Error fetching resorts. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/v1/destinations/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        setDestinations(destinations.filter((dest) => dest.id !== id));
        setSuccessMessage('Resort deleted successfully!');
      } else {
        setErrorMessage('Error deleting resort. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error deleting resort. Please try again.');
    }
  };

  return (
    <div className="container-delete">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <h2 className="sub_heading">Available Resorts</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Lists of Resorts</th>
            <th className="td">Delete Resorts</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((destination) => (
            <tr key={destination.id}>
              <td>{destination.name}</td>
              <td>
                <button
                  className="button"
                  type="button"
                  onClick={() => handleDelete(destination.id)}
                  style={{ cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteResort;
