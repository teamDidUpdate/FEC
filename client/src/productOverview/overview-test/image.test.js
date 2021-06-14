import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Image from '../image.jsx';
import productStyle from '../sampleStyle.js';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Image currentStyle={productStyle.results[0]}/>, div);
});