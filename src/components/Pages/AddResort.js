import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import './AddResort.css';

const AddResort = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [cityName, setCityName] = useState('');
  const [fee, setFee] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resortData = {
      name,
      description,
      image_url: imageURL,
      city_name: cityName,
      fee,
    };

    try {
      setLoading(true);

      const authToken = sessionStorage.getItem('authToken');

      await axios.post(
        'https://resort-vista.onrender.com/api/v1/destinations',
        resortData,
        {
          headers: {
            Authorization: authToken,
          },
        },
      );

      setSuccessMessage('Resort added successfully!');
      setName('');
      setDescription('');
      setImageURL('');
      setCityName('');
      setFee('');
    } catch (error) {
      setErrorMessage('Error adding resort. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-resort-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {isLoading && <LoadingSpinner />}
      <h2>Add a Resort</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name (minimum 3 characters)"
            required
          />
        </label>
        <label htmlFor="description">
          Description:
          <input
            id="description-add"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (minimum 3 characters)"
            required
          />
        </label>
        <label htmlFor="imageURL">
          Image URL:
          <input
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Enter image URL (minimum 3 characters)"
            required
          />
        </label>
        <label htmlFor="cityName">
          City Name:
          <input
            type="text"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name (minimum 3 characters)"
            required
          />
        </label>
        <label htmlFor="fee">
          Fee:
          <input
            type="number"
            id="fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            placeholder="Enter fee"
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Add Resort
        </button>
      </form>
    </div>
  );
};

export default AddResort;
