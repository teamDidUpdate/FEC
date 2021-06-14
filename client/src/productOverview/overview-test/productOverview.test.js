import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import OverviewApp from '../overviewApp.jsx';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OverviewApp />, div);
});