import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import axios from 'axios';
import OverviewApp from './productOverview/overviewApp.jsx';
const ReviewEntry = lazy(() => import('./Reviews/components/ReviewEntry.jsx'));
const RatingEntry = lazy(() => import('./Reviews/components/RatingEntry.jsx'));
const QAwidget = lazy(() => import('./QA/QAwidget.jsx'));
const RelatedItemsAndComparison = lazy(() => import('./relatedItems/RelatedEntry/RelatedEntry.jsx'));
import SectionTracker from './Tracker/SectionTracker.jsx';

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
          <section id='product-overview-section'>
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
          </section>
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
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
            </section>
          </Suspense>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;