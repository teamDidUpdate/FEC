import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RatingEntry from '../RatingEntry.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RatingEntry />, div);

});