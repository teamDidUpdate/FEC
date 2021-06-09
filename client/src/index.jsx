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
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.get('/getProduct', { params: { productId: productId } })
      .then((response) => {
        setCurrentProduct(response.data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [productId]);

  const getProductById = async (id) => {
    try {
      let newProduct = {};
      await axios.get('/getProduct', {params: {productId: id }})
        .then((response)=> {
          newProduct = response.data;
        })
        .catch((err)=> {
          console.log(err);
          return;
        });
      return newProduct;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <OverviewApp productId={productId}
          setProductId={setProductId} />
      </div>
      <div>
        <RelatedItemsAndComparison
          product={currentProduct}
          productId={productId}
          setProductId={setProductId}
          getProductById={getProductById} />
      </div>
      <div>
        <QAwidget
          productId={productId}
          setProductId={setProductId}
          getProductById={getProductById}
          currentProduct={currentProduct}/>
      </div>
      <div>
        <ReviewEntry productId={productId}
          setProductId={setProductId}
          getProductById={getProductById} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));