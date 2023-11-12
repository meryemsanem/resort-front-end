import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate, useParams } from "react-router";
import { IconContext } from 'react-icons';
import * as FcIcon from 'react-icons/fc';
import * as AiIcon from 'react-icons/ai';
// import { useLocation } from 'react-router-dom';
import "./Resorts.css";

const ResortDetails = () => {
  const { id } = useParams();
//   const location = useLocation();
  const navigate = useNavigate();
//   const { house } = location.state;

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <section id="detail-container">
        <div id="card-container">
          <div id="img-container">
            <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww"
              id="detail-img"
              alt="resort"
            />
          </div>
          <div id="detail-info">
            <div className="house-address">
              <h1 id="house-name">Beautiful house</h1>
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
              leorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum quia
            </p>
            <button id="reserver-btn" type="button" onClick={() => { navigate(`/houses/${house?.id}/reservations`); }}>
              Reserve
              <FcIcon.FcOvertime id="reserve-icon" />
            </button>
          </div>
        </div>
        <button type="button" className="back" onClick={() => navigate(`/home`)}>
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