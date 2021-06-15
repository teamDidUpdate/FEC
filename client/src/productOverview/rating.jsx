import React, { useContext } from 'react';
import { ThemeContext } from '../App.jsx';
import axios from 'axios';
import StarsRating from 'stars-rating';

const Rating = (props) => {
  const darkTheme = useContext(ThemeContext);
  return (
    <div className="rating">
      <StarsRating count={5} value={props.rating} half={true} edit={false}/>
      {props.reviewCount > 0
        ? <a href='#jumpEntry' className="review-text" style={{color: darkTheme ? '#d6d6d6' : '#333'}} onClick={() => {
          document.getElementsByClassName('numberOfReviews')[0].focus();
        }}>
        Read all {props.reviewCount} reviews
        </a>
        : <div className="review-text">No Reviews</div>}
    </div>

  );
};

export default Rating;