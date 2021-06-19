import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import OutfitCard from '../OutfitCard.jsx';
import renderer from 'react-test-renderer';
import sampleOutfits from '../../../../../data/sampleOutfits.js';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

test('renders an outfit card without crashing', () => {
  render(<OutfitCard outfit={sampleOutfits[13023]}/>);
  const outfitElement = screen.getByTestId('outfit-13023');
  expect(outfitElement).toBeInTheDocument();
});

test('outfit card matches snapshot', () => {
  const outfitTree = renderer.create(<OutfitCard outfit={sampleOutfits[13023]}/>).toJSON();
  expect(outfitTree).toMatchSnapshot();
});