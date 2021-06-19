import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import RelatedCard from '../RelatedCard.jsx';
import productWithStyle from '../../../../../data/sampleRelatedProducts.js';

afterEach(() => {
  cleanup();
});

test('renders a related card without crashing', () => {
  render(<RelatedCard product={productWithStyle[0]} />);
  const relatedElement = screen.getByTestId('related-13023');
  expect(relatedElement).toBeInTheDocument();
});

test('related card matches snapshot', () => {
  const relatedTree = renderer.create(<RelatedCard product={productWithStyle[0]} />).toJSON();
  expect(relatedTree).toMatchSnapshot();
});