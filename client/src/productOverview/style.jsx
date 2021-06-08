import React from 'react';
import productStyle from './sampleStyle.js';

const Style = (props) => {
  let styles = productStyle.results;
  let onSale = props.currentStyle.sale_price;
  const currentSize = [];
  const skus = props.currentStyle.skus;
  for (let key in skus) {
    currentSize.push(skus[key].size);
  }

  return (
    <div>
      <div>
        {props.currentStyle.original_price}
        {onSale && <text> Sale Price: {onSale}</text>}
      </div>
      <div>
        STYLE {'>'} SELECTED STYLE
      </div>
      <div className="style-selector">
        {styles.map((style) => <img className="style-image" src={style.photos[0].thumbnail_url} key={style.style_id} onClick={() => props.changeStyle(style)}></img>)}
      </div>
      <div className="size-selector">
        <select id="size-select">
          <option value="">SELECT SIZE</option>
          {currentSize.map((size) => <option value="size">{size}</option>)}
        </select>
        <select id="quan-select">
          <option value="">1</option>
          <option value="">2</option>
        </select>
      </div>
    </div>
  );
};

export default Style;