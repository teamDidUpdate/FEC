import React, { useState, useEffect } from 'react';
import RelatedCard from './RelatedCard.jsx';
import axios from 'axios';

const RelatedItemsAndComparison = ({productId, setProductId, getProductById}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    axios.get('/relatedIds', { params: { productId: productId } })
      .then((response) => {
        let relatedIds = response.data;
        console.log('relatedIds', relatedIds);
        return getRelatedProducts(relatedIds);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [productId]);

  const getRelatedProducts = async (ids) => {
    try {
      let items = await ids.map(id => {
        return getRelatedProductById(id);
      });
      let relatedItems = await Promise.all(items);
      console.log('relatedItems', relatedItems);
      setRelatedProducts(relatedItems);
    } catch (err) {
      console.log(err);
    }
  };

  const getRelatedProductById = async (id) => {
    let relatedProduct = {};
    await axios.get('/relatedProduct', { params: { productId: id } })
      .then((response) => {
        relatedProduct = response.data;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    return relatedProduct;
  };


  return (
    <div className='related-items-and-comparison grid-outer-container'>
      {relatedProducts.length !== 0 ? relatedProducts.map(relatedItem => {
        return (
          <div
            className='related-card grid-container'
            key={relatedItem.overview.id}
            onClick={() => setProductId(relatedItem.overview.id)}
          >
            <RelatedCard relatedItem={relatedItem}/>
          </div>
        );
      }) : null}
    </div>
  );
};

export default RelatedItemsAndComparison;