import React, { useState, useEffect } from 'react';

const RelatedCard = ({ product }) => {
  const [action, setAction] = useState();
  const imageURL = product.styles.results[0].photos[0].thumbnail_url;

  return (
    <>
      <div className='grid-item'>
        <button onClick={() => console.log('PLACEHOLDER')}>Compare</button>
      </div>
      <div className='grid-item'>
        <img className='related-image' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
      </div>
      <div className='grid-item'>{product.overview.category}</div>
      <div className='grid-item'>{product.overview.name}</div>
      <div className='grid-item'>{product.overview.default_price}</div>
      <div className='grid-item'>RATING PLACEHOLDER</div>
    </>
  );
};

export default RelatedCard;