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
    this.state = {
      currentStyle: productStyle.results[0]
    };
    this.changeStyle = this.changeStyle.bind(this);
  }

  changeStyle(style) {
    this.setState({
      currentStyle: style
    });
  }

  render () {
    const currentProduct = products[0];
    return (
      <div>
        <div id="header" className="overview-header">
          <h1>LOGO</h1>
        </div>
        <div className="highlight">SITE-WIDE ANNOUNCEMENT MESSAGE! -- SLAE / DISCOUNT OFFER -- NEW PRODECT HIGHLIGHT</div>
        <div className="overview-container">
          <div className="image-gallary">
            <Image productStyle={this.state.currentStyle}/>
          </div>
          <div className="style-section">
            <Rating />
            <Title product={currentProduct}/>
            <Style currentStyle={this.state.currentStyle} changeStyle={this.changeStyle}/>
          </div>
        </div>
      </div>
    );
  }
}

export default OverviewApp;