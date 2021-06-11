import React, { useState, useEffect } from 'react';
import {MdStarBorder} from 'react-icons/Md';

const RelatedCard = ({ product, productId, setProductId }) => {
  const [action, setAction] = useState();
  const imageURL = product.styles.results[0].photos[0].thumbnail_url;

  console.log(product);
  return (
    <div className='card-container' onClick={() => setProductId(product.overview.id)}>
      <MdStarBorder className='action-btn' onClick={() => console.log('PLACEHOLDER')}/>
      <div className='card-item'>
        <img className='related-image' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
      </div>
      <div className='card-item text'>{product.overview.category}</div>
      <div className='card-item text'>{product.overview.name}</div>
      <div className='card-item text'>{product.overview.default_price}</div>
      <div className='card-item text'>RATING PLACEHOLDER</div>
    </div>
  );
};

export default RelatedCard;