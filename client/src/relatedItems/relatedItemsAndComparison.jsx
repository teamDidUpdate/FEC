import React, { useState, useEffect } from 'react';
import RelatedCard from './relatedCard.jsx';

const RelatedItemsAndComparison = ({productId, setProductId, getProductById}) => {
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    getRelatedItems();
  }, [productId]);

  const getRelatedItems = async () => {
    try {
      let response = await fetch(`http://localhost:1128/relatedItems/?productId=${productId}`);
      if (!response.ok) {
        throw 'Error while fetching related items';
      }
      let relatedItemIds = await response.json();
      let items = relatedItemIds.map(relatedItemId => {
        return getProductById(relatedItemId);
      });
      let newItems = await Promise.all(items);
      setRelatedItems(newItems);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <table className='related-items'>
      <tbody>
        {relatedItems.map(relatedItem => {
          return (
            <tr key={relatedItem.id}>
              <td>{relatedItem.category}</td>
              <td>{relatedItem.name}</td>
              <td>{relatedItem.price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RelatedItemsAndComparison;