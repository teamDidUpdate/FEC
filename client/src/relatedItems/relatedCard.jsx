import React, { useState, useEffect } from 'react';
import {MdStarBorder} from 'react-icons/Md';
import StarsRating from 'stars-rating';
import axios from 'axios';

const RelatedCard = ({ product, productId, setProductId }) => {
  const [defaultStyle, setDefaultStyle] = useState(product.styles.results[0]);
  const [averageRating, setaAverageRating] = useState(0);
  const imageURL = product.styles.results[0].photos[0].thumbnail_url;

  useEffect(() => {
    getDefaultStyle();
    getStarRating();
  }, [product]);

  const getDefaultStyle = () => {
    product.styles.results.forEach(style => {
      if (style['default?'] === true) {
        setDefaultStyle(style);
      }
    });
  };

  const getStarRating = () => {
    axios.get('/getAverageRating', { params: { productId: productId } })
      .then((response) => {
        let average = response.data;
        console.log(average);
        return setaAverageRating(average);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  return (
    <div className='card-container' onClick={() => setProductId(product.overview.id)}>
      <MdStarBorder className='action-btn' onClick={() => console.log('PLACEHOLDER')}/>
      <div className='card-item'>
        <img className='related-image' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
      </div>
      <div className='card-item text category'>{product.overview.category.toUpperCase()}</div>
      <div className='card-item text name'>{product.overview.name}</div>
      { defaultStyle.sale_price ?
        <div className='card-item text price'>
          <p style={{color: 'red'}}>${defaultStyle.sale_price}</p>
          <p style={{textDecoration: 'line-through'}}>${defaultStyle.original_price}</p>
        </div>
        : <div className='card-item text'>${defaultStyle.original_price}</div>
      }
      <div className='card-item text rating'>
        <StarsRating count={5} value={averageRating} half={true} edit={false} color2={'#333300'}/>
      </div>
    </div>
  );
};

export default RelatedCard;