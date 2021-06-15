import React from 'react';
import ReactDOM from 'react-dom';
import OutfitCard from '../OutfitCard.jsx';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OutfitCard/>, div);
});