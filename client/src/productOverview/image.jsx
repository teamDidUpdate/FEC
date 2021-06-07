import React, { useState, useEffect } from 'react';

const Image = (props) => {
  const currentImg = props.productStyle;
  const [imageURL, setImageURL] = useState(currentImg.photos[0].url);
  const [images, setImages] = useState(currentImg.photos);

  if (images !== currentImg.photos) {
    setImageURL(currentImg.photos[0].url);
    setImages(currentImg.photos);
  }

  return (
    <div>
      <div className="images">
        <div className="main-pic">
          <img className="main-image" src={imageURL}></img>
        </div>
        <div className="style-pics">
          {images.map((image) => <div><img className="gallery-image" src={image.thumbnail_url} onClick={(e) => setImageURL(e.target.src)}></img></div>)}
        </div>
      </div>
    </div>
  );
};

export default Image;