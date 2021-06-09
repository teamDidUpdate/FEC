import React, {useState} from 'react';
import Cart from './cart.jsx';
import productStyle from './sampleStyle.js';

const Style = (props) => {
  const [currentStyleId, setCurrentStyleId] = useState(props.currentStyle.style_id);
  let styles = props.allStyles;
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
          {onSale && <span style={{color: 'red', marginRight: '10px'}}>${onSale}</span>}
          <span style={{ 'textDecorationLine': 'line-through' }}>${props.currentStyle.original_price}</span>
        </div>
        : <div className="price-tag">
        ${props.currentStyle.original_price}
        </div>
      }
      <p className="stlye-text">
        <b className="bold-text">STYLE {'>'}</b> SELECTED STYLE
      </p>
      <div className="style-selector">

        {styles.map((style) =>
          <div className="container" key={style.style_id}>
            <img className="style-image" src={style.photos[0].thumbnail_url} onClick={(e) => { props.setCurrentStyle(style); setCurrentStyleId(style.style_id); } }></img>
            {currentStyleId === style.style_id && <div className="top-right">✔</div>}
          </div>
        )}
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
      <Cart />
    </div>
  );
};

export default Style;