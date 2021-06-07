import React, { useState, useEffect } from 'react';

const RelatedItemsAndComparison = ( {productId, setProductId}) => {
  console.log(`ProductId in relatedItems is ${productId}`);

  return (
    <div>
      <p>{productId}</p>
    </div>
  );
};

export default RelatedItemsAndComparison;