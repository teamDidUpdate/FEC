import React, { useState, useEffect } from 'react';

const Image = (props) => {
  const currentImg = props.productStyle;
  const [images, setImages] = useState(currentImg.photos);
  const [imageIdx, setImageIdx] = useState(0);
  const [imageURL, setImageURL] = useState(images[imageIdx].url);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);

  if (images !== currentImg.photos) {
    setImageURL(currentImg.photos[0].url);
    setImages(currentImg.photos);
  }

  useEffect(() => {
    setStart(0);
    setEnd(7);
    setImageIdx(0);
  }, [props]);

  const handleClick = (next) => {
    if (next === 1) {
      setImageIdx(prevIdx => prevIdx + 1);
    } else {
      setImageIdx(prevIdx => prevIdx - 1);
    }
    setImageURL(images[imageIdx].url);
  };

  const handleScroll = () => {
    if (end < images.length) {
      setStart(prevStart => prevStart + 1);
      setEnd(prevEnd => prevEnd + 1);
      setImageIdx(prevIdx => prevIdx + 1);
      setImageURL(images[imageIdx + 1].url);
    }
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
          {images.slice(start, end).map((image) => <div className="gallery-container" key={image.url} onClick={(e) => setImageURL(image.url)}>
            <img className="gallery-image" src={image.thumbnail_url}></img>
            {(imageURL === image.url) && <span className="blackLine"></span>}
          </div>)}
          {(images.length > 7 && end < images.length) && <div className="arrow" onClick={() => handleScroll()}>﹀</div>}
        </div>
      </div>
    </div>
  );
};

export default Image;