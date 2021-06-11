import React, { useState, useEffect } from 'react';

const Image = (props) => {
  const currentImg = props.currentStyle;
  const [images, setImages] = useState(currentImg.photos);
  const [imageIdx, setImageIdx] = useState(0);
  const [imageURL, setImageURL] = useState(images[imageIdx].url);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(7);
  const [imgStyle, setImgStyle] = useState({});
  const [containerStyle, setContainerStyle] = useState({});

  if (images !== currentImg.photos) {
    setImageURL(currentImg.photos[0].url);
    setImages(currentImg.photos);
  }

  useEffect(() => {
    setStart(0);
    setEnd(7);
    setImageIdx(0);
  }, [props.currentStyle]);

  useEffect(() => {
    setImageURL(images[imageIdx].url);
  }, [imageIdx]);

  useEffect(() => {
    if (props.expendView) {
      setImgStyle({display: 'none'});
      // setContainerStyle({width: '115.5%'});
    } else {
      setImgStyle({});
    }
  }, [props.expendView]);


  const handleClick = (next) => {
    if (next === 1) {
      setImageIdx(prevIdx => prevIdx + 1);
    } else {
      setImageIdx(prevIdx => prevIdx - 1);
    }

  };

  const handleScroll = () => {
    if (end < images.length - 1) {
      setStart(prevStart => prevStart + 1);
      setEnd(prevEnd => prevEnd + 1);
      setImageIdx(prevIdx => prevIdx + 1);
      setImageURL(images[imageIdx + 1].url);
    }
  };

  const handleZoom = (e) => {
    let container = document.getElementById('main-div');
    let img = document.getElementById('main-img');
    let imgWidth = img.naturalWidth;
    let imgHeight = img.naturalHeight;
    let ratio = imgHeight / imgWidth;


    let boxWidth = container.clientWidth;
    let rect = e.target.getBoundingClientRect();
    let xPos = e.clientX - rect.left;
    let yPos = e.clientY - rect.top;
    let xPercent = xPos / (boxWidth / 100) + '%';
    let yPercent = yPos / ((boxWidth * ratio) / 100) + '%';
    Object.assign(container.style, {
      backgroundPosition: xPercent + ' ' + yPercent,
      backgroundSize: imgWidth * 2.5 + 'px'
    });
  };

  return (
    <div>
      <div className="images">
        <div className="image-container" style={containerStyle}>
          <img id="main-img" src={imageURL} style={imgStyle}></img>
          {props.expendView && <div id="main-div" onClick={(e) => handleZoom(e)} style={{background: `url(${imageURL})`,backgroundSize: 'cover'}}></div>}
          <div className="zoom-icon" onClick={() => { props.setView(!props.expendView); } }>
            <span className="zoom-icon-up">⌜ ⌝</span>
            <span className="zoom-icon-down">⌞ ⌟</span>
          </div>
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