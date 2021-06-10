import React, { useState, useEffect } from 'react';
import {MdStarBorder} from 'react-icons/Md';

const RelatedCard = ({ product, id }) => {
  const [action, setAction] = useState();
  const imageURL = product.styles.results[0].photos[0].thumbnail_url;

  return (
    <div className='card-container' key={id}>
      <MdStarBorder className='action-btn' onClick={() => console.log('PLACEHOLDER')}/>
      <div className='card-item'>
        <img className='related-image' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
      </div>
      <div className='card-item'>{product.overview.category}</div>
      <div className='card-item'>{product.overview.name}</div>
      <div className='card-item'>{product.overview.default_price}</div>
      <div className='card-item'>RATING PLACEHOLDER</div>
    </div>
  );
};

export default RelatedCard;