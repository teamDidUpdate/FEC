import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewEntry from './Reviews/components/ReviewEntry.jsx';
import RatingEntry from './Reviews/components/RatingEntry.jsx';
import OverviewApp from './productOverview/overviewApp.jsx';
import QAwidget from './QA/QAwidget.jsx';
import RelatedItemsAndComparison from './relatedItems/RelatedEntry/RelatedEntry.jsx';
import SectionTracker from './Tracker/SectionTracker.jsx';

const App = () => {
  const [productId, setProductId] = useState(13023);
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [currentProduct, setCurrentProduct] = useState({});

  return (
    <div>
      <section id='product-overview-section'>
        <OverviewApp productId={productId}
          reviewCount={reviewCount}
          rating={rating}
          setProductId={setProductId}
          setCurrentProduct={setCurrentProduct}
        />
      </section>
      <section id='related-items-and-comparison-section'>
        <RelatedItemsAndComparison
          productId={productId}
          setProductId={setProductId}
          overviewProduct={currentProduct}
          overviewRating={rating}
        />
      </section>
      <section id='questions-and-answers-section'>
        <QAwidget
          productId={productId}
          setProductId={setProductId}
        />
      </section>
      <br></br>
      <section id='reviews-and-ratings-section'>
        <ReviewEntry productId={productId}
          setProductId={setProductId}
          setReviewCount={setReviewCount}
          setRating={setRating}
        />
      </section>
    </div>
  );
};

export default App;