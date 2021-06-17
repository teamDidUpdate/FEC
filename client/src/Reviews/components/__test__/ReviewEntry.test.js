import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ReviewEntry from '../ReviewEntry.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReviewEntry />, div);

});