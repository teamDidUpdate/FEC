import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewsOverview from './Reviews/ReviewsOverview.jsx';
import ReviewEntry from './Reviews/components/ReviewEntry.jsx';
import RatingEntry from './Reviews/components/RatingEntry.jsx';
import OverviewApp from './productOverview/overviewApp.jsx';
import QAwidget from './QA/QAwidget.jsx';
import RelatedItemsAndComparison from './relatedItems/relatedItemsAndComparison.jsx';


const App = () => {
  const [productId, setProductId] = useState(13023);

  return (
    <div>
      <div>
        <OverviewApp productId={productId}
          setProductId={setProductId} />
      </div>
      <div>
        <RelatedItemsAndComparison
          productId={productId}
          setProductId={setProductId} />
      </div>
      <div>
        <QAwidget
          productId={productId}
          setProductId={setProductId}/>
      </div>
      <div>
        <ReviewEntry productId={productId}
          setProductId={setProductId} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));