import React from 'react';
import axios from 'axios';
import Stars from '../Reviews/components/stars.jsx';

const Rating = (props) => {
  return (
    <div className="rating">
      <Stars calValue={props.rating}/>
      Read all {props.reviewCount} reviews
    </div>

  );
};

export default Rating;