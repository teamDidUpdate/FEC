import React from 'react';
import ReactDOM from 'react-dom';
import QAWidget from '../QAWidget.jsx';

it ('render Q&A without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QAWidget />, div);
});