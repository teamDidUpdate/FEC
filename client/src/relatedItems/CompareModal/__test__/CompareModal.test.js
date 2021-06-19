import React from 'react';
import ReactDOM from 'react-dom';
import CompareModal from '../CompareModal.jsx';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CompareModal/>, div);
});