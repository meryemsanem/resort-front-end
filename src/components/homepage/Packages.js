import React from 'react';
import Package from './Package';
import './package.css';
const Packages = () => {
  return (
    <div className='container'>
      <h1 className='headline'>TOUR PACKAGES</h1>
      <p className='desc'>please select a tour package</p>

      
        <Package  />
     

    </div>
  );
};

export default Packages;