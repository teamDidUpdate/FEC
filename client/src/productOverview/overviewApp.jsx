import React from 'react';
import Rating from './rating.jsx';
import Title from './title.jsx';
import Style from './style.jsx';
import Image from './image.jsx';
import products from './sampleProducts.js';
import productStyle from './sampleStyle.js';

class OverviewApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const currentProduct = products[0];
    return (
      <div>
        <div id="header" className="overview-header">
          <h1>logo</h1>
        </div>
        <div className="overview-row">
          <div className="col-md-5">
            <Image productStyle={productStyle}/>
          </div>
          <div className="col-md-7">
            <Rating />
            <Title product={currentProduct}/>
            <Style />
          </div>
        </div>
      </div>
    );
  }
}

export default OverviewApp;