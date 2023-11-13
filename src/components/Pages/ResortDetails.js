import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FcIcon from 'react-icons/fc';
import * as AiIcon from 'react-icons/ai';
import './Resorts.css';

const ResortDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fee, setFee] = useState(null);
  const { destination } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:4000/api/v1/destinations/${destination.id}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFee(data.fee);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (destination) {
      fetchData();
    }
  }, [destination]);

  return destination ? (
    <IconContext.Provider value={{ color: '#fff' }}>
      <section id="detail-container">
        <div id="card-container">
          <div id="img-container">
            <img
              src={destination.image_url}
              alt={destination.name}
              id="detail-img"
            />
          </div>
          <div id="detail-info">
            <div className="resort-address">
              <h1 id="resort-name">{destination.name}</h1>
              <p id="resort-description">{destination.description}</p>
            </div>
            <div className="price-container">
              <div className="details">
                <li>
                  <p className="info-name">
                    Fee:
                    {fee}
                  </p>
                </li>
                <li>
                  <p className="info-name">
                    Name:
                    {destination.name}
                  </p>
                </li>
              </div>
            </div>
            <button
              id="reserver-btn"
              type="button"
              onClick={() => {
                navigate('/reservations');
              }}
            >
              Reserve
              {' '}
              <FcIcon.FcOvertime id="reserve-icon" />
            </button>
          </div>
        </div>
        <button
          type="button"
          className="back"
          onClick={() => navigate('/resorts')}
        >
          <AiIcon.AiFillCaretLeft />
          {' '}
          back
          {' '}
        </button>
      </section>
    </IconContext.Provider>
  ) : null;
};

export default ResortDetails;
