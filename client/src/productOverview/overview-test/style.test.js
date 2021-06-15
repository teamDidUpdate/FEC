import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Style from '../style.jsx';
import productStyle from '../sampleStyle.js';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Style currentStyle={productStyle.results[0]} allStyles={productStyle.results}/>, div);
});