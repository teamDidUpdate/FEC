import React, { useState, useEffect } from 'react';
import StarsRating from 'stars-rating';
import {IoMdCloseCircleOutline} from 'react-icons/Io';

const OutfitCard = ({outfit, productId, setProductId, getDefaultStyle}) => {
  const [defaultStyle, setDefaultStyle] = useState({});
  const imageURL = outfit.styles.results[0].photos[0].thumbnail_url;


  useEffect(() => {
    (async () => {
      let style = await getDefaultStyle(outfit);
      setDefaultStyle(style);
    })();
  }, [outfit]);

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
        <IoMdCloseCircleOutline className='action-btn' onClick={() => console.log('click')}/>
        <div className='card-inner-container'onClick={() => setProductId(outfit.overview.id)}>
          <div className='card-item'>
            <img className='card-image' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
          </div>
          <div className='card-item text category'>{outfit.overview.category.toUpperCase()}</div>
          <div className='card-item text name'>{outfit.overview.name}</div>
          { defaultStyle.sale_price ?
            <div className='card-item text price'>
              <p style={{color: 'red'}}>${defaultStyle.sale_price}</p>
              <p style={{textDecoration: 'line-through'}}>${defaultStyle.original_price}</p>
            </div>
            : <div className='card-item text'>${defaultStyle.original_price}</div>
          }
          <div className='card-item text rating'>
            <StarsRating count={5} value={outfit.rating} half={true} edit={false} color2={'#333300'}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutfitCard;
