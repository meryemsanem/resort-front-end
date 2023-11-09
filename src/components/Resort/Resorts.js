import React from 'react';
import './Resorts.css';
import Packages from '../homepage/Packages';


const Resort = () => (
  <div>
    <div className="header">
      <h1 className="title">LATEST RESORTS</h1>
      <p className="title-info">Please choose your favorite Resort</p>
    </div>
    <br />
    <br />
    <Packages />
  </div>
);

export default Resort;
