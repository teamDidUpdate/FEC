import React, { useState, useEffect } from 'react';

const RelatedItemsAndComparison = ( {productId, setProductId}) => {
  console.log(`ProductId in relatedItems is ${productId}`);
  setInterval(() => {
    setProductId(previousState => previousState + 1);
  }, 2000);

  return (
    <div>
      <p>{productId}</p>
    </div>
  );
};

export default RelatedItemsAndComparison;