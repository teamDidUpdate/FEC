import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewEntry from './Reviews/components/ReviewEntry.jsx';
import RatingEntry from './Reviews/components/RatingEntry.jsx';
import OverviewApp from './productOverview/overviewApp.jsx';
import QAwidget from './QA/QAwidget.jsx';
import RelatedItemsAndComparison from './relatedItems/RelatedEntry/RelatedEntry.jsx';
import SectionTracker from './Tracker/SectionTracker.jsx';
import LazyLoad from 'react-lazy-load';

export const ThemeContext = React.createContext();

const App = () => {
  const [productId, setProductId] = useState(13023);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [currentProduct, setCurrentProduct] = useState({});
  const [darkTheme, setDarkTheme] = useState(false);
  const themeStyles = {
    backgroundColor: darkTheme ? '#222' : '#fff',
    color: darkTheme ? '#fff' : '#333',
    borderColor: darkTheme ? '#fff' : '#222'
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <div id="darkTheme" style={themeStyles}>
        <div id="padding">
          <section id='product-overview-section' style={{margin: '2vh'}}>
            <LazyLoad height={'105vh'} width={'65vw'} offsetVertical={0}>
              <SectionTracker sectionName={'product-overview-section'} render={(handleTracking) => (
                <OverviewApp productId={productId}
                  reviewCount={reviewCount}
                  rating={rating}
                  setProductId={setProductId}
                  setCurrentProduct={setCurrentProduct}
                  setDarkTheme={setDarkTheme}
                  handleTracking={handleTracking}
                />
              )}>
              </SectionTracker>
            </LazyLoad>
          </section>
          <section id='related-items-and-comparison-section'>
            <SectionTracker sectionName={'related-items-and-comparison-section'} render={(handleTracking) => (
              <RelatedItemsAndComparison
                productId={productId}
                setProductId={setProductId}
                overviewProduct={currentProduct}
                overviewRating={rating}
                handleTracking={handleTracking}
              />
            )}>
            </SectionTracker>
          </section>
          <section id='questions-and-answers-section'>
            <SectionTracker sectionName={'questions-and-answers-section'} render={(handleTracking) => (
              <QAwidget
                productId={productId}
                setProductId={setProductId}
                handleTracking={handleTracking}
              />
            )}>
            </SectionTracker>
          </section>
          <section id='reviews-and-ratings-section'>
            <SectionTracker sectionName={'reviews-and-ratings-section'} render={(handleTracking) => (
              <ReviewEntry productId={productId}
                setProductId={setProductId}
                setReviewCount={setReviewCount}
                setRating={setRating}
                handleTracking={handleTracking}
              />
            )}>
            </SectionTracker>
          <section id='related-items-and-comparison-section'style={{margin: '2vh'}}>
            <LazyLoad height={'100vh'} width={'65vw'} offsetVertical={300}>
              <SectionTracker sectionName={'related-items-and-comparison-section'} render={(handleTracking) => (
                <RelatedItemsAndComparison
                  productId={productId}
                  setProductId={setProductId}
                  overviewProduct={currentProduct}
                  overviewRating={rating}
                  handleTracking={handleTracking}
                />
              )}>
              </SectionTracker>
            </LazyLoad>
          </section>
          <section id='questions-and-answers-section' style={{margin: '2vh'}}>
            <LazyLoad height={'20vh'} width={'65vw'} offsetVertical={300}>
              <SectionTracker sectionName={'questions-and-answers-section'} render={(handleTracking) => (
                <QAwidget
                  productId={productId}
                  setProductId={setProductId}
                  handleTracking={handleTracking}
                />
              )}>
              </SectionTracker>
            </LazyLoad>
          </section>
          <section id='reviews-and-ratings-section' style={{margin: '2vh'}}>
            <LazyLoad height={'20vh'} width={'65vw'} offsetVertical={200}>
              <SectionTracker sectionName={'reviews-and-ratings-section'} render={(handleTracking) => (
                <ReviewEntry productId={productId}
                  setProductId={setProductId}
                  setReviewCount={setReviewCount}
                  setRating={setRating}
                  handleTracking={handleTracking}
                />
              )}>
              </SectionTracker>
            </LazyLoad>
          </section>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;