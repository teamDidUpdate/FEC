import React, { useState, useEffect } from 'react';
import CompareModal from './CompareModal.jsx';
import {MdStarBorder} from 'react-icons/Md';
import StarsRating from 'stars-rating';
import axios from 'axios';

const RelatedCard = ({ product, productId, setProductId }) => {
  const [defaultStyle, setDefaultStyle] = useState(product.styles.results[0]);
  const [averageRating, setaAverageRating] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
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
        return setaAverageRating(average);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  return (
    <div className='card-container'>
      <MdStarBorder className='action-btn' onClick={() => setModalOpen(true)}/>
      <CompareModal open={modalOpen} productId={productId} relatedProduct={product} onClose={() => setModalOpen(false)}/>
      <div className='card-inner-container'onClick={() => setProductId(product.overview.id)}>
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
    </div>
  );
};

export default RelatedCard;