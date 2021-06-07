import React from 'react';

const Image = (props) => {
  const currentImg = props.productStyle.results[0];
  const images = currentImg.photos;
  return (
    <div>
      <div col="one">
        {images.map((image) => <img className="gallery-image" src={image.thumbnail_url}></img>)}
      </div>
      <img className="main-image" src={currentImg.photos[0].url}></img>
    </div>
  );
};

export default Image;