import React from 'react';

const Image = (props) => {
  const currentImg = props.productStyle.results[0];
  const images = currentImg.photos;
  return (
    <div>
      <div className="images">
        <div className="main-pic">
          <img className="main-image" src={currentImg.photos[0].url}></img>
        </div>
        <div className="style-pics">
          {images.map((image) => <div><img className="gallery-image" src={image.thumbnail_url}></img></div>)}
        </div>
      </div>
    </div>
  );
};

export default Image;