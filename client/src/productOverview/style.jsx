import React from 'react';
import productStyle from './sampleStyle.js';

const Style = (props) => {
  const currentStyle = productStyle.results[0];
  let styles = productStyle.results;

  return (
    <div>
      <div>{currentStyle.original_price}</div>
      <div>
        STYLE > SELECTED STYLE
      </div>
      
      {styles.map((style) => <img className="style-image" src={style.photos[0].thumbnail_url} key={style.style_id}></img>)}
    </div>
  );
};

export default Style;