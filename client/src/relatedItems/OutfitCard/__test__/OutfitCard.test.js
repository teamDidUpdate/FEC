import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import OutfitCard from '../OutfitCard.jsx';
import {renderer, act } from 'react-test-renderer';
import sampleOutfits from '../../../../../data/sampleOutfits.js';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

it ('renders without crashing', () => {
  act(() => {
    render(<OutfitCard outfit={sampleOutfits[13023]}/>);
  });
  const outfitElement = screen.getByTestId('outfit-13023');
  expect(outfitElement).toBeInTheDocument();
});
