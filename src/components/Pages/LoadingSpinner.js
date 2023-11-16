import React from 'react';
import loadingImage from '../Images/loading.gif';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <img src={loadingImage} alt="loading..." />
  </div>
);

export default LoadingSpinner;
