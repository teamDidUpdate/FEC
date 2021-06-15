import React from 'react';
import ReactDOM from 'react-dom';
import RelatedItemsAndComparison from '../RelatedEntry.jsx';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RelatedItemsAndComparison/>, div);
});