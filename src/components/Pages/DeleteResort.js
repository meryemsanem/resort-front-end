import React from 'react';
import PropTypes from 'prop-types';

const DeleteResort = ({ destinations, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>City</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {destinations.map((destination) => (
        <tr key={destination.id}>
          <td>{destination.name}</td>
          <td>{destination.city}</td>
          <td>
            <button type="button" onClick={() => onDelete(destination.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

DeleteResort.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteResort;
