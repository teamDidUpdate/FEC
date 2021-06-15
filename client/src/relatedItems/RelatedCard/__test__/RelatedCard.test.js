import React from 'react';
import ReactDOM from 'react-dom';
import RelatedCard from '../RelatedCard.jsx';
import productWithStyle from '../../../../../data/sampleRelatedProducts.js';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RelatedCard product={productWithStyle} />, div);
});