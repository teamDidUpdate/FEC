import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIToken from '../../../../config.js';
import { render } from 'react-dom';
import Stars from './stars.jsx';
import StarsRating from 'stars-rating';


const RatingEntry = ({ currentProductId, setRating }) => {
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta/?product_id=${currentProductId}`, {
      headers: {
        Authorization: APIToken.TOKEN
      }
    })
      .then((response) => {
        setCurrentProduct(response.data);
        // for (var key in response.data) {
        //   currentProduct[key] = response.data[key];
        // }
      });

  }, [currentProductId]);


  var calculate = function (object) {
    var sum = 0;
    var quant = 0;
    for (var key in object) {
      sum = sum + (Number(key) * Number(object[key]));
      quant += Number(object[key]);
    }
    var number = sum / quant;
    return Number((Math.round(number * 4) / 4).toFixed(2));
  };

  // for grab rating
  useEffect(() => {
    setRating(calculate(currentProduct.ratings));
  }, [currentProduct]);

  return (
    <div>

      {Object.keys(currentProduct).length > 0 ?
        <div>
          <div className='RatingsHeading'>Ratings and Reviews</div>
          <div className='StarAndQuarterRating'>
            <div className='quarterRating' >{calculate(currentProduct.ratings)}</div>
            <Stars calValue = {calculate(currentProduct.ratings)}/>
          </div>
          <div className='recommendationPercent'>{((Number(currentProduct.recommended.true) / (Number(currentProduct.recommended.false) + Number(currentProduct.recommended.true))) * 100).toString().substring(0, 2)}% of people recommend this product!</div>
          <div className='StarsGraphRating'>
            <div className='theStars' id='5Stars'>5 Stars</div>
            <div className='theStars' id='4Stars'>4 Stars</div>
            <div className='theStars' id='3Stars'>3 Stars</div>
            <div className='theStars' id='2Stars'>2 Stars</div>
            <div className='theStars' id='1Stars'>1 Stars</div>
          </div>
        </div> :
        null}
      {/* {Object.keys(currentProduct).length > 0 ?
      <div className='RatingsHeading'>Ratings and Reviews</div>
      <div className='quarterRating'></div>
      <div className='recommendationPercent'>{currentProduct}</div>
      : null} */}
    </div>
  );
};


export default RatingEntry;
