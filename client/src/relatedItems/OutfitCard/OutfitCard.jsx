import React, { useState, useEffect, useContext } from 'react';
import StarsRating from 'stars-rating';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { ThemeContext } from '../../App.jsx';

const OutfitCard = ({outfit, productId, setProductId, getDefaultStyle, deleteOutfit}) => {
  const [defaultStyle, setDefaultStyle] = useState({});
  const imageURL = outfit.styles.results[0].photos[0].thumbnail_url;
  const darkTheme = useContext(ThemeContext);


  useEffect(() => {
    (async () => {
      let style = await getDefaultStyle(outfit);
      setDefaultStyle(style);
    })();
  }, [outfit]);

  const handleOutfitCardClick = async () => {
    await setProductId(outfit.overview.id);
    document.getElementById('header').scrollIntoView();
  };

  return (
    <>
      <div className='card-container' data-testid={`outfit-${outfit.overview.id}`}>
        <IoMdCloseCircleOutline className='action-btn'
          style={{color: darkTheme ? '#fff' : '#000', backgroundColor: darkTheme ? '#000' : '#fff'}}
          onClick={() => deleteOutfit(outfit.overview.id)}/>
        <div className='card-inner-container'onClick={() => handleOutfitCardClick()}>
          <div className='card-item'>
            <img loading='lazy' className='card-image' alt='outfit-card' src={imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'}></img>
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
            <StarsRating count={5} value={outfit.rating} half={true} edit={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OutfitCard;
