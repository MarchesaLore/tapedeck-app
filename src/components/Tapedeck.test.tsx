import React from 'react';
import { render, screen } from '@testing-library/react';
import Tapedeck from './Tapedeck';

test('renders CassetteList component', () => {
  render(<Tapedeck />);
  const cassetteListHeader = screen.getByText(/Cassette List/i);
  expect(cassetteListHeader).toBeInTheDocument();
});

