import React, { useState, useEffect } from 'react';
import {MdStarBorder} from 'react-icons/Md';

const RelatedCard = ({ product, productId, setProductId }) => {
  const [defaultStyle, setDefaultStyle] = useState(product.styles.results[0]);
  const imageURL = product.styles.results[0].photos[0].thumbnail_url;

  useEffect(() => {
    getDefaultStyle();
  }, [product]);

  const getDefaultStyle = () => {
    product.styles.results.forEach(style => {
      if (style['default?'] === true) {
        setDefaultStyle(style);
      }
    });
  };

  return (
    <div className='card-container' onClick={() => setProductId(product.overview.id)}>
      <MdStarBorder className='action-btn' onClick={() => console.log('PLACEHOLDER')}/>
      <div className='card-item'>
        <img className='related-image' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
      </div>
      <div className='card-item text'>{product.overview.category}</div>
      <div className='card-item text'>{product.overview.name}</div>
      { defaultStyle.sale_price ?
        <div className='card-item text'>
          <p style={{color: 'red'}}>{defaultStyle.sale_price}</p>
          <p style={{textDecoration: 'line-through'}}>{defaultStyle.original_price}</p>
        </div>
        : <div className='card-item text'>{defaultStyle.original_price}</div>
      }
      <div className='card-item text'>RATING PLACEHOLDER</div>
    </div>
  );
};

export default RelatedCard;