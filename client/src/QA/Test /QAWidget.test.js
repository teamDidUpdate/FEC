import React from 'react';
import ReactDOM from 'react-dom';
import QAWidget from '../QAWidget.jsx';
import { render, screen, cleanup } from '@testing-library/react';

it ('render Q&A without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QAWidget />, div);
});