import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Rating from './rating.jsx';
import Title from './title.jsx';
import Style from './style.jsx';
import Image from './image.jsx';
import Description from './description.jsx';
import Share from './share.jsx';

const OverviewApp = (props) => {
  const [overviewProduct, setOverviewProduct] = useState(null);
  const [allStyles, setAllStyles] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(null);

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
        <h1>LOGO</h1>
      </div>
      <div className="highlight">SITE-WIDE ANNOUNCEMENT MESSAGE! -- SLAE / DISCOUNT OFFER -- NEW PRODECT HIGHLIGHT</div>
      {(overviewProduct === null || allStyles === null || currentStyle === null)
        ? <div>Loading</div>
        :
        <div className="overview-container">
          <div className="image-gallary">
            <Image productStyle={currentStyle}/>
          </div>
          <div className="style-section">
            <Rating />
            <Title product={overviewProduct}/>
            <Style currentStyle={currentStyle} setCurrentStyle={setCurrentStyle} allStyles={allStyles} />
          </div>
          <Description product={overviewProduct}/>
          <Share />
        </div>
      }
    </div>
  );

};

export default OverviewApp;