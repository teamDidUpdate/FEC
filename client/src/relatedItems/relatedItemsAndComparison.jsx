import React, { useState, useEffect } from 'react';
import RelatedCard from './RelatedCard.jsx';

const RelatedItemsAndComparison = ({product, productId, setProductId, getProductById}) => {
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    if (product !== undefined && Object.keys(product).length !== 0) {
      getRelatedItems();
    }
  }, [product]);

  const getRelatedItems = async () => {
    try {
      let items = await product.relatedIds.map(relatedId => {
        return getProductById(relatedId);
      });
      let newItems = await Promise.all(items);
      console.log(newItems);
      setRelatedItems(newItems);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='related-items-and-comparison'>
      {relatedItems.length !== 0 ? relatedItems.map(relatedItem => {
        return (
          <div key={relatedItem.overview.id}>
            <RelatedCard relatedItem={relatedItem}/>
          </div>
        );
      }) : null}
    </div>
  );
};

export default RelatedItemsAndComparison;