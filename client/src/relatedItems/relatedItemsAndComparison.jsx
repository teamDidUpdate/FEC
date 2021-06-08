import React, { useState, useEffect } from 'react';
import RelatedCard from './RelatedCard.jsx';

const RelatedItemsAndComparison = ({product, productId, setProductId, getProductById}) => {
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    getRelatedItems();
  }, [product]);

  const getRelatedItems = async () => {
    if (product !== undefined) {
      try {
        let items = product.relatedIds.map(relatedId => {
          return getProductById(relatedId);
        });
        let newItems = await Promise.all(items);
        setRelatedItems(newItems);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='related-items-and-comparison'>
      {relatedItems.length !== 0 ? relatedItems.map(relatedItem => {
        return (
          <RelatedCard relatedItem={relatedItem}/>
        );
      }) : null}
    </div>
  );
};

export default RelatedItemsAndComparison;