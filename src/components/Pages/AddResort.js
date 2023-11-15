import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

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
        'http://127.0.0.1:4000/api/v1/destinations',
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
      console.error('Error adding resort:', error);
      setErrorMessage('Error adding resort. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-resort-container">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
            required
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            required
          />
        </label>
        <button type="submit">Add Resort</button>
      </form>
    </div>
  );
};

export default AddResort;
