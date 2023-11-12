import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate, useParams } from "react-router";
import { IconContext } from 'react-icons';
import * as FcIcon from 'react-icons/fc';
import * as AiIcon from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import "./Resorts.css";

const ResortDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { destination } = location.state;

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <section id="detail-container">
        <div id="card-container">
          <div id="img-container">
            <img
               src={destination.image_url} 
               alt={destination.name}             
                id="detail-img"
              alt="resort"
            />
          </div>
          <div id="detail-info">
            <div className="house-address">
              <h1 id="house-name">{destination.name}</h1>
              <p id="location">Bamenda cameroon</p>
            </div>
            <div className="price-container">
              <li className="border">
                <p className="info-name">Price: </p>
                <p id="price">
                  $
        2000
                </p>
              </li>
              <li className="border">
                <p className="info-name">Bedrooms: </p>
                <p id="bed-room">
                  
                  45
                  bds
                </p>
              </li>
            </div>
            <p id="description">
              <span className="detail">Detail:</span>
          {destination.description}
            </p>
            <button id="reserver-btn" type="button" onClick={() => { navigate(`/reservations`); }}>
              Reserve
              <FcIcon.FcOvertime id="reserve-icon" />
            </button>
          </div>
        </div>
        <button type="button" className="back" onClick={() => navigate(`/resorts`)}>
          <AiIcon.AiFillCaretLeft />
          {' '}
          back
          {' '}
        </button>
      </section>
    </IconContext.Provider>
  );
};

export default ResortDetails;