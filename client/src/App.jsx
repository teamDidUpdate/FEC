import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewEntry from './Reviews/components/ReviewEntry.jsx';
import RatingEntry from './Reviews/components/RatingEntry.jsx';
import OverviewApp from './productOverview/overviewApp.jsx';
import QAwidget from './QA/QAwidget.jsx';
import RelatedItemsAndComparison from './relatedItems/RelatedEntry/RelatedEntry.jsx';

export const ThemeContext = React.createContext();

const App = () => {
  const [productId, setProductId] = useState(13023);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [currentProduct, setCurrentProduct] = useState({});
  const [darkTheme, setDarkTheme] = useState(false);
  const themeStyles = {
    backgroundColor: darkTheme ? '#333' : 'white',
    color: darkTheme ? '#d6d6d6' : '#333'
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <div id="darkTheme" style={themeStyles}>
        <div id="padding">
          <div>
            <OverviewApp productId={productId}
              reviewCount={reviewCount}
              rating={rating}
              setProductId={setProductId}
              setCurrentProduct={setCurrentProduct}
              setDarkTheme={setDarkTheme} />
          </div>
          {/* <div>
            <RelatedItemsAndComparison
              productId={productId}
              setProductId={setProductId}
              overviewProduct={currentProduct}
              overviewRating={rating}
            />
          </div>
          <div>
            <QAwidget
              productId={productId}
              setProductId={setProductId}/>
          </div>
          <br></br>
          <div>
            <ReviewEntry productId={productId}
              setProductId={setProductId}
              setReviewCount={setReviewCount}
              setRating={setRating} />
          </div> */}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;