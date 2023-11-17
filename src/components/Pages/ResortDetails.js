import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FcIcon from 'react-icons/fc';
import * as AiIcon from 'react-icons/ai';
import color from '../Images/color.png';
import './ResortDetails.css';

const ResortDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const { destination } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://resort-vista.onrender.com/api/v1/destinations/${destination.id}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFee(data.fee);
      } finally {
        setLoading(false);
      }
    };

    if (destination) {
      fetchData();
    }
  }, [destination]);
  const handleReserveClick = () => {
    navigate('/reserve', { state: { destination } });
  };
  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <section id="detail-container">
        {loading && <p>Loading...</p>}
        {!loading && destination ? (
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
              <div className="container-details">
                <ul className="details">
                  <li className="info-name">
                    Fee:
                    {fee}
                  </li>

                  <li className="info-name">
                    Name:
                    {destination.name}
                  </li>

                  <li className="info-name">
                    City:
                    {destination.city_name}
                  </li>
                </ul>
                <div className="color-image">
                  <p className="discover">DISCOVER MORE MODELS </p>
                  <img src={color} alt="color" className="color" />
                </div>
              </div>
              <div className="reserve-btn">
                <button
                  type="button"
                  className="back"
                  id="reserver-btn"
                  onClick={() => navigate('/resorts')}
                >
                  <AiIcon.AiFillCaretLeft />
                  {' '}
                  back
                  {' '}
                </button>
                <button
                  id="reserver-btn"
                  type="button"
                  onClick={handleReserveClick}
                >
                  Reserve
                  {' '}
                  <FcIcon.FcOvertime id="reserve-icon" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          !loading && <p>Destination not available.</p>
        )}
      </section>
    </IconContext.Provider>
  );
};
export default ResortDetails;
