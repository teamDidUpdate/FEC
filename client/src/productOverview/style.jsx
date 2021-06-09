import React from 'react';
import productStyle from './sampleStyle.js';

const Style = (props) => {
  let styles = productStyle.results;
  let onSale = props.currentStyle.sale_price;
  const currentSize = [];
  const skus = props.currentStyle.skus;
  const sizeKeys = [];
  for (let key in skus) {
    currentSize.push([key, skus[key].size]);
  }

  return (
    <div className="style">
      {onSale
        ? <div className="price-tag">
          <text style={{'textDecorationLine': 'line-through'}}>${props.currentStyle.original_price}</text>
          {onSale && <text> Sale Price: ${onSale}</text>}
        </div>
        : <div className="price-tag">
        ${props.currentStyle.original_price}
        </div>
      }
      <div>
        STYLE {'>'} SELECTED STYLE
      </div>
      <div className="style-selector">
        {styles.map((style) => <img className="style-image" src={style.photos[0].thumbnail_url} key={style.style_id} onClick={(e) => { props.changeStyle(style); } }></img>)}
      </div>
      <div className="size-selector">
        <select id="size-select">
          <option value="">SELECT SIZE</option>
          {currentSize.map((size) => <option key={size[0]} value="size">{size[1]}</option>)}
        </select>
        <select id="quan-select">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>

        </select>
      </div>
    </div>
  );
};

export default Style;