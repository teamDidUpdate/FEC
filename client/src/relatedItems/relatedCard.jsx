import React, { useState, useEffect } from 'react';

const RelatedCard = ({relatedItem}) => {
  const [action, setAction] = useState();
  const imageURL = relatedItem.styles.results[0].photos[0].thumbnail_url;

  return (
    <div className='related-items grid-container'>
      <div className='grid-item'>
        <button onClick={() => console.log('PLACEHOLDER')}>Compare</button>
      </div>
      <div className='grid-item'>
        <img className='related-image' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
      </div>
      <div className='grid-item'>{relatedItem.overview.category}</div>
      <div className='grid-item'>{relatedItem.overview.name}</div>
      <div className='grid-item'>{relatedItem.overview.default_price}</div>
    </div>
  );
};

export default RelatedCard;