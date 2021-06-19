import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Carousel from '../Carousel.jsx';
import productsWithStyle from '../../../../../data/sampleRelatedProducts.js';
import products from '../../../../../data/sampleProducts.js';
import sampleOutfits from '../../../../../data/sampleOutfits.js';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('renders the Related Carousel without crashing', () => {
  render(<Carousel
    products={productsWithStyle}
    productId={13023}
    related={true}
    overviewProduct={products[0]}
    overviewRating={4}
  />);
  const carouselElement = screen.getByTestId('carousel-1');
  expect(carouselElement).toBeInTheDocument();
});

test('renders Outfit Carousel without crashing', () => {
  render(<Carousel
    products={sampleOutfits}
    productId={13023}
    related={false}
    overviewProduct={products[0]}
    overviewRating={4}
  />);
  const carouselElement = screen.getByTestId('carousel-1');
  expect(carouselElement).toBeInTheDocument();
});

test('related carousel matches snapshot', () => {
  const relatedTree = renderer.create(<Carousel
    products={productsWithStyle}
    productId={13023}
    related={true}
    overviewProduct={products[0]}
    overviewRating={4}
  />).toJSON();
  expect(relatedTree).toMatchSnapshot();
});

test('outfit carousel matches snapshot', () => {
  const outfitTree = renderer.create(<Carousel
    products={sampleOutfits}
    productId={13023}
    related={false}
    overviewProduct={products[0]}
    overviewRating={4}
  />).toJSON();
  expect(outfitTree).toMatchSnapshot();
});