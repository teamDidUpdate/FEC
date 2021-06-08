import React, { useState, useEffect } from 'react';

const RelatedItemsAndComparison = ( {productId, setProductId}) => {
  const [relatedItemIds, setRelatedItemIds] = useState([]);

  useEffect(async () => {
    try {
      let response = await fetch(`http://localhost:1128/relatedItems/?productId=${productId}`);
      if (!response.ok) {
        throw 'Error while fetching related items';
      }
      let data = await response.json();
      setRelatedItemIds(data);
      // TODO: for each id, fetch the relevant product info
    } catch (err) {
      console.log(err);
    }
  }, [productId]);

  return (
    <div>
      <p>productId: {productId}</p>
      <p>Related Item Ids: {relatedItemIds}</p>
    </div>
  );
};

export default RelatedItemsAndComparison;