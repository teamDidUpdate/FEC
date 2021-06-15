import React from 'react';
import ReactDOM from 'react-dom';
import OutfitCard from '../OutfitCard.jsx';
import productWithStyle from '../../../../../data/sampleRelatedProducts.js';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OutfitCard outfit={productWithStyle}/>, div);
});