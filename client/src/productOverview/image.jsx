import React, { useState, useEffect } from 'react';

const Image = (props) => {
  const currentImg = props.productStyle;
  const [images, setImages] = useState(currentImg.photos);
  const [imageIdx, setImageIdx] = useState(0);
  const [imageURL, setImageURL] = useState(images[imageIdx].url);
  let restImages = [];

  if (images !== currentImg.photos) {
    setImageURL(currentImg.photos[0].url);
    setImages(currentImg.photos);
  }

  const handleClick = (next) => {
    if (next === 1) {
      setImageIdx(prevIdx => prevIdx + 1);
    } else {
      setImageIdx(prevIdx => prevIdx - 1);
    }
    setImageURL(images[imageIdx].url);
  };

  return (
    <div>
      <div className="images">
        <div className="image-container">
          <img src={imageURL}></img>
          {(imageURL !== images[images.length - 1].url) && <a className="next" onClick={() => { handleClick(1); }}>&#10095;</a>}

          {(imageURL !== images[0].url) && <a className="prev" onClick={() => { handleClick(0); }}>&#10094;</a>}
        </div>
        <div className="style-pics">
          {images.map((image) => <div className="gallery-container" key={image.url} onClick={(e) => setImageURL(image.url)}>
            <img className="gallery-image" src={image.thumbnail_url}></img>
            {(imageURL === image.url) && <span className="blackLine"></span>}
          </div>)}
          {images.length > 7 && <div id="arrow">﹀</div>}
        </div>
      </div>
    </div>
  );
};

export default Image;