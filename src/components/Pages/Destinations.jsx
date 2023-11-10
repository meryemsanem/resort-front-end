/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import styles from './Destinations.css';

const Destinations = () => {
  const destinations = useSelector((state) => state.destinations);

  const navigate = useNavigate();

  const {
    card, cardTop, cardBottom, carouselContainer, carouselTitle,
  } = styles;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSpecificPage = (id) => {
    navigate(`/destinations/${id}`);
  };

  return (
    <div className="page-container">
      <div className={carouselContainer}>
        <h1 className={carouselTitle}>LATEST SAFARIS</h1>
        <Slider {...settings}>
          {destinations.map((destination) => (
            <div key={destination.id}>
              <div className={card}>
                <div className={cardTop}>
                  <img src={destination.image_url} alt={destination.name} />
                  <h2>{destination.city_name}</h2>
                </div>
                <div className={cardBottom}>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <button type="button" onClick={() => handleSpecificPage(destination.id)}>Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Destinations;
