import React, { useEffect, useState } from 'react';
import './DeleteResort.css';

const DeleteResort = () => {
  const [destinations, setDestinations] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/v1/destinations');
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!destinations || !Array.isArray(destinations)) {
    return <p>Loading...</p>;
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:4000/api/v1/destinations/${id}`, {
        method: 'DELETE',
      });
      setDestinations(destinations.filter((dest) => dest.id !== id));
    } catch (error) {
      console.error('Error deleting destination:', error);
    }
  };

  return (
    <div>
      <h2>Delete Resorts</h2>
      <table>
        <thead>
          <tr>
            <th>Lists of Resorts</th>
            <th>Delete Resorts</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((destination) => (
            <tr key={destination.id}>
              <td>{destination.name}</td>
              <td>
                <button
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
