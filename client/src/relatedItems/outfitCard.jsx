import React, { useState, useEffect } from 'react';
import {MdStarBorder} from 'react-icons/Md';
import StarsRating from 'stars-rating';
import IoMdCloseCircleOutline from 'react-icons/Io';

const OutfitCard = (outfit, productId, setProductId) => {
  const [defaultStyle, setDefaultStyle] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const imageURL = product.styles.results[0].photos[0].thumbnail_url;

  useEffect(() => {
    (async () => {
      let style = await getDefaultStyle(product);
      setDefaultStyle(style);
      let starRating = await getStarRating(product.overview.id);
      setAverageRating(starRating);
    })();
  }, [product]);

  // const removeOutfit = (outfit) => {
  //   let allOutfits = {...outfits};
  //   delete allOutfits[outfit.overview.id];
  //   setOutfits(allOutfits);
  //   window.localStorage.removeItem('myThreads');
  //   window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));
  // };

  return (
    <>
      <div className='card-container'>
        {/* <MdStarBorder className='action-btn' onClick={() => setModalOpen(true)}/>
      <IoMdCloseCircleOutline onClick={() => console.log('click')}/>
      <div className='card-inner-container'onClick={() => setProductId(product.overview.id)}>
        <div className='card-item'>
          <img className='card-image' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
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
      </div> */}
      </div>
    </>
  );
};

export default OutfitCard;
