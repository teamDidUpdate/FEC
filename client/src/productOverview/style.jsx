import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cart from './cart.jsx';
import Share from './share.jsx';

const Style = (props) => {
  const [currentStyleId, setCurrentStyleId] = useState(props.currentStyle.style_id);
  const [sizeNumber, setSizeNumber] = useState(0);
  const [stock, setStock] = useState(true);
  let styles = props.allStyles;
  let onSale = props.currentStyle.sale_price;
  const currentSize = [];
  const quantity = [];
  const skus = props.currentStyle.skus;
  const sizeKeys = [];

  for (let key in skus) {
    currentSize.push([key, skus[key].size]);
    quantity.push([key, skus[key].quantity]);
  }

  if (currentStyleId !== props.currentStyle.style_id) {
    setCurrentStyleId(props.currentStyle.style_id);
  }

  useEffect(() => {
    setStock(stock);
  }, [sizeNumber]);

  const checkStock = () => {
    for (let j = 0; j < quantity.length; j++) {
      if (quantity[j][0] === sizeNumber) {
        if (quantity[j][1] > 0) {
          return true;
        }
      }
    }
    return false;
  };

  const getLimit = () => {
    if (quantity[0][0] === null) {
      setStock(false);
    }

    let limitNumber;

    for (let j = 0; j < quantity.length; j++) {
      if (quantity[j][0] === sizeNumber) {
        limitNumber = quantity[j][1];
        break;
      }
    }
    if (limitNumber === undefined) {
      return ['-'];
    }
    let numberOption = [];
    for (let i = 1; i < limitNumber + 1; i++) {
      if (limitNumber > 15) {
        limitNumber = 15;
      }
      numberOption.push(i);
    }
    return numberOption;
  };

  const handleSubmit = (e) => {
    axios.post('/addToCart', { 'skuId': sizeNumber })
      .then((data) => {
        if (data.data === 'Created') {
          alert('Added 1 product');
        }
      })
      .catch((err) => { console.log('add to cart error:' + err); });
    e.preventDefault();
  };

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
        <b className="bold-text">STYLE {'>'}</b> {props.currentStyle.name}
      </p>
      <div className="style-selector">

        {styles.map((style) =>
          <div className="container" key={style.style_id}>
            <img className="style-image" src={style.photos[0].thumbnail_url} onClick={(e) => { props.setCurrentStyle(style); setCurrentStyleId(style.style_id); } }></img>
            {currentStyleId === style.style_id && <div className="top-right">✔</div>}
          </div>
        )}
      </div>
      <form id="add-product-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="size-selector">
          <select id="size-select" value={sizeNumber} onChange={(e) => {
            setSizeNumber(e.target.value);
          }} required>
            <option value="">SELECT SIZE</option>
            {currentSize.map((size) => <option key={size[0]} value={size[0]}>{size[1]}</option>)}
          </select>
          <select id="quan-select" required onChange={() => { if (sizeNumber === 0) { setStock(false); } }}>
            {getLimit().map((q) => <option key={q} value="size">{q}</option>)}
          </select>
        </div>
        {(stock && sizeNumber !== 'null') && <Cart />}
      </form>
      <Share />
    </div>
  );
};

export default Style;