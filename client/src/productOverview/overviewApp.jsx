import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Rating from './rating.jsx';
import Title from './title.jsx';
import Style from './style.jsx';
import Image from './image.jsx';
import Description from './description.jsx';
import Feature from './feature.jsx';
import products from './sampleProducts.js';
import productStyle from './sampleStyle.js';
import { ThemeContext } from '../App.jsx';

const OverviewApp = (props) => {
  const [overviewProduct, setOverviewProduct] = useState(products[0]);
  const [allStyles, setAllStyles] = useState(productStyle.results);
  const [currentStyle, setCurrentStyle] = useState(productStyle.results[0]);
  const [expendView, setView] = useState(false);
  const darkTheme = useContext(ThemeContext);


  useEffect(() => {
    axios.get('/overview', { params: { productId: props.productId } })
      .then((response) => {
        setOverviewProduct(response.data.overview);
        setAllStyles(response.data.styles.results);
        setCurrentStyle(response.data.styles.results[0]);
        props.setCurrentProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [props.productId]);

  const toggleTheme = () => {
    props.setDarkTheme(prevDarkTheme => !prevDarkTheme);
  };

  return (
    <div>
      <div id="header" className="overview-header">
        <h1>THREADS</h1>
        <img className="logo-img" src="icon/threadsLogo.png"></img>

        <label class="switch">
          <input type="checkbox" onClick={() => toggleTheme()}/>
          <span class="slider round"></span>
        </label>
      </div>
      <div className="highlight" style={{color: darkTheme ? '#d6d6d6' : '#69706e'}}>SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW PRODECT HIGHLIGHT</div>
      {(overviewProduct === null || allStyles === null || currentStyle === null)
        ? <div>Loading</div>
        :
        <div className="overview-container">
          <div className="image-gallary">
            <Image currentStyle={currentStyle} expendView={expendView} setView={setView}/>
          </div>
          {expendView ?
            <div className="style-section"></div>
            : <div className="style-section">
              <Rating reviewCount={props.reviewCount} rating={props.rating}/>
              <Title product={overviewProduct}/>
              <Style currentStyle={currentStyle} setCurrentStyle={setCurrentStyle} allStyles={allStyles} />
            </div>
          }
          <Description product={overviewProduct}/>
          <Feature features={overviewProduct.features}/>
        </div>
      }
    </div>
  );

};

export default OverviewApp;