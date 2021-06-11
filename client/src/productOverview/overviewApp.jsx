import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Rating from './rating.jsx';
import Title from './title.jsx';
import Style from './style.jsx';
import Image from './image.jsx';
import Description from './description.jsx';
import Share from './share.jsx';
import products from './sampleProducts.js';
import productStyle from './sampleStyle.js';

const OverviewApp = (props) => {
  const [overviewProduct, setOverviewProduct] = useState(products[0]);
  const [allStyles, setAllStyles] = useState(productStyle.results);
  const [currentStyle, setCurrentStyle] = useState(productStyle.results[0]);
  const [expendView, setView] = useState(false);

  useEffect(() => {
    axios.get('/overview', { params: { productId: props.productId } })
      .then((response) => {
        setOverviewProduct(response.data.overview);
        setAllStyles(response.data.styles.results);
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
        <h1>THREADS</h1>
        {/* [backup img] <img className="logo-img" src="https://img.icons8.com/ios/452/squiggly-line.png"></img> */}
        <img className="logo-img" src="https://static.thenounproject.com/png/3268844-200.png"></img>
        <img className="logo-imgtwo" src="https://static.thenounproject.com/png/3268844-200.png"></img>


      </div>
      <div className="highlight">SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW PRODECT HIGHLIGHT</div>
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
          <Share />
        </div>
      }
    </div>
  );

};

export default OverviewApp;