import React, { useContext } from 'react';
import { ThemeContext } from '../App.jsx';

const Description = (props) => {
  const darkTheme = useContext(ThemeContext);
  return (
    <div className="description-container" style={{borderColor: darkTheme ? '#d6d6d6' : '#2b2c2c'}}>
      <div className="product-slogan">Product Slogan. {props.product.slogan}</div>
      <div style={{color: darkTheme ? '#d6d6d6' : '#69706e', paddingRight: '8px'}} className="product-des">{props.product.description}</div>
    </div>
  );
};

export default Description;