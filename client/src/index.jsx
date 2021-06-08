import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import ReviewsOverview from './Reviews/ReviewsOverview.jsx';
import OverviewApp from './productOverview/overviewApp.jsx';
import QAwidget from './QA/QAwidget.jsx';
import RelatedItemsAndComparison from './relatedItems/relatedItemsAndComparison.jsx';


const App = () => {
  const [productId, setProductId] = useState(13023);

  useEffect(() => {
    console.log(`ProductId changed to ${productId}`);
  }, [productId]);

  return (
    <div>
      <div>
        <OverviewApp productId={productId} setProductId={setProductId}/>
      </div>
      <div>
        <RelatedItemsAndComparison productId={productId} setProductId={setProductId} />
      </div>
      <div>
        <QAwidget />
      </div>
      <div>
        <ReviewsOverview />
      </div>

    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));