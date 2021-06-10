import React from 'react';
import axios from 'axios';

const Rating = (props) => {
  return (
    <div className="rating">
      ★★★★★
      Read all {props.reviewCount} reviews
    </div>

  );
};

export default Rating;