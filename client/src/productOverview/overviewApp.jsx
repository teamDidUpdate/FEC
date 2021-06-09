import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Rating from './rating.jsx';
import Title from './title.jsx';
import Style from './style.jsx';
import Image from './image.jsx';
import products from './sampleProducts.js';
import productStyle from './sampleStyle.js';

const OverviewApp = (props) => {
  const [overviewProduct, setOverviewProduct] = useState(products[0]);
  const [currentStyle, setCurrentStyle] = useState(productStyle.results[0]);

  useEffect(() => {
    axios.get('/overview', { params: { productId: props.productId } })
      .then((response) => {
        console.log(response.data);
        setOverviewProduct(response.data.overview);
        setCurrentStyle(response.data.styles.results[0]);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [props.productId]);

  return (
    <div>
      <div id="header" className="overview-header">
        <h1>LOGO</h1>
      </div>
      <div className="highlight">SITE-WIDE ANNOUNCEMENT MESSAGE! -- SLAE / DISCOUNT OFFER -- NEW PRODECT HIGHLIGHT</div>
      <div className="overview-container">
        <div className="image-gallary">
          <Image productStyle={currentStyle}/>
        </div>
        <div className="style-section">
          <Rating />
          <Title product={overviewProduct}/>
          <Style currentStyle={currentStyle} setCurrentStyle={setCurrentStyle}/>
        </div>
      </div>
    </div>
  );

};

export default OverviewApp;