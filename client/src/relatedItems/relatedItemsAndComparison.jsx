import React, { useState, useEffect } from 'react';

const RelatedItemsAndComparison = ( {productId, setProductId}) => {
  const [relatedItemIds, setRelatedItemIds] = useState([]);
  // https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}

  useEffect(async () => {
    try {
      let response = await fetch(`http://localhost:1128/relatedItems`);
      if (!response.ok) {
        throw 'Error while fetching related items';
      }
      let data = await response.json();
      console.log(data);
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