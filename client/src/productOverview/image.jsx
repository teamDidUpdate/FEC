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
  const [zoomIn, setZoomIn] = useState(false);

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
      setContainerStyle({width: '135.5%'});
    } else {
      setImgStyle({});
      setContainerStyle({width: '100%'});
    }
  }, [props.expendView]);


  const handleClick = (next) => {
    if (next === 1) {
      setImageIdx(prevIdx => prevIdx + 1);
    } else {
      setImageIdx(imageIdx === 0 ? 0 : imageIdx - 1);
    }
  };

  const handleThumClick = (url) => {
    setImageURL(url);
    for (let i = 0; i < images.length; i++) {
      if (images[i].url === url) {
        setImageIdx(i);
        return;
      }
    }
  };

  const handleScroll = (direction) => {
    if (end < images.length - 1 && direction === 'down') {
      setStart(prevStart => prevStart + 1);
      setEnd(prevEnd => prevEnd + 1);
    }
    if (direction === 'up') {
      setStart(prevStart => prevStart - 1);
      setEnd(prevEnd => prevEnd - 1);
    }
  };

  const handleZoom = (e) => {
    let container = document.getElementById('main-div');
    let img = document.getElementById('main-img');
    let imgWidth = img.naturalWidth;
    let imgHeight = img.naturalHeight;
    let boxWidth = container.clientWidth;
    let boxHeight = container.clientHeight;
    let rect = e.target.getBoundingClientRect();
    let xPos = e.clientX - rect.left;
    let yPos = e.clientY - rect.top;
    let xPercent = xPos / (boxWidth / 100) + '%';
    let yPercent = yPos / (boxHeight / 100) + '%';

    Object.assign(container.style, {
      backgroundPosition: xPercent + ' ' + yPercent,
      backgroundSize: boxWidth * 3 + 'px'
    });
  };


  if (zoomIn) {
    document.getElementById('main-div').style.cursor = 'zoom-out';
    document.getElementById('main-div').onmousemove = handleZoom;
  }

  return (
    <div>
      <div className="images">
        <div className="image-container" style={containerStyle}>
          <img id="main-img" src={imageURL} style={imgStyle} onClick={() => props.setView(!props.expendView) }></img>
          {props.expendView &&
            <div id="main-div" onClick={(e) => {
              if (!zoomIn) {
                setZoomIn(!zoomIn);
                handleZoom(e);
              } else {
                setZoomIn(!zoomIn);
                props.setView(!props.expendView);
              }
            }} style={{backgroundImage: `url(${imageURL})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          }
          {!zoomIn && <div className="zoom-icon" onClick={() => props.setView(!props.expendView) }>
            <span className="zoom-icon-up">⌜ ⌝</span>
            <span className="zoom-icon-down">⌞ ⌟</span>
          </div>}
          {(imageURL !== images[images.length - 1].url && !zoomIn) && <a className="next" onClick={() => { handleClick(1); }}>&#10095;</a>}
          {(imageURL !== images[0].url && !zoomIn) && <a className="prev" onClick={() => { handleClick(0); }}>&#10094;</a>}
        </div>
        {!zoomIn &&
        <div className="style-pics">
          {images.slice(start, end).map((image) => <div className="gallery-container" key={image.url} onClick={(e) => handleThumClick(image.url)}>
            <img className="gallery-image" src={image.thumbnail_url}></img>
            {(imageURL === image.url) && <span className="blackLine"></span>}
          </div>)}
          {(images.length > 7 && start > 0) && <div className="arrow up" onClick={() => handleScroll('up')}>︿</div>}
          {(images.length > 7 && end < images.length - 1) && <div className="arrow down" onClick={() => handleScroll('down')}>﹀</div>}
        </div>
        }
      </div>
    </div>
  );
};

export default Image;