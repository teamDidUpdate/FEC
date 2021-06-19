import React from 'react';
import ReactDOM from 'react-dom';
import QAWidget from '../QAWidget.jsx';
import { render, screen, cleanup } from '@testing-library/react';

test ('render Q&A without crashing', () => {
  render(<QAWidget/>);
  const qawidget = screen.getByTestId();
  expect(qawidget).toBeInTheDocument();
  expect(qawidget).toHaveTextContent('Questions & Answers');
});