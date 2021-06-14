import React from 'react';
import ReactDOM from 'react-dom';
import RelatedCard from '../RelatedCard.jsx';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RelatedCard/>, div);
});