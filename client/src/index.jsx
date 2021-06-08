import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewsOverview from './Reviews/ReviewsOverview.jsx';
import OverviewApp from './productOverview/overviewApp.jsx';
import QAwidget from './QA/QAwidget.jsx';
import RelatedItemsAndComparison from './relatedItems/relatedItemsAndComparison.jsx';


const App = () => {
  const [productId, setProductId] = useState(13023);
  const [currentProduct, setCurrentProduct] = useState({});



  useEffect(() => {
    axios.get('/getProduct', {params: {productId: 13023 }})
      .then((response)=> {
        setCurrentProduct(response.data);
      })
      .catch((err)=> {
        console.log(err);
        return;
      });
    (async () => {
      await handleProductIdChange();
    })();
  }, [productId]);

  const handleProductIdChange = async () => {
    let newProduct = await getProductById(productId);
    setCurrentProduct(newProduct);
  };

  const getProductById = async (id) => {
    try {
      let response = await fetch(`http://localhost:1128/product/?productId=${id}`);
      if (!response.ok) {
        throw 'Error while fetching product by Id';
      }
      let product = await response.json();
      // to make this generally applicable for all widgets, do not set state here
      return product;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <OverviewApp productId={productId}
          setProductId={setProductId}
          getProductById={getProductById}/>
      </div>
      <div>
        <RelatedItemsAndComparison
          productId={productId}
          setProductId={setProductId}
          getProductById={getProductById}/>
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