import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Tapedeck from './Tapedeck';

describe('Tapedeck Component', () => {
  test('renders Tapedeck component', async () => {
    render(<Tapedeck />);

    // Wait for the component to finish loading
    await screen.findByText('Tapedeck');

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    // Assert that the component renders without errors
    expect(screen.getByText('Tapedeck')).toBeInTheDocument();
  });

  test('handles filter change', async () => {
    render(<Tapedeck />);

    // Wait for the component to finish loading
    await screen.findByText('Tapedeck');

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    // Simulate a filter change
    fireEvent.change(screen.getByLabelText('Items per Page:'), { target: { value: '30' } });

    // Assert that the filter change is reflected in the component
    expect(screen.getByLabelText('Items per Page:')).toHaveValue('30');
  });

  test('renders Tapedeck component with correct list after filter change', async () => {
    render(<Tapedeck />);

    // Wait for the component to finish loading
    await screen.findByText('Tapedeck');

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    // Simulate filter changes
    fireEvent.change(screen.getByLabelText('Brand Filter'), { target: { value: 'Sony' } });
    fireEvent.change(screen.getByLabelText('Color Filter'), { target: { value: 'Black' } });

    await waitFor(() => {
      expect(screen.getByText('Total Results: 1')).toBeInTheDocument();
    });
  });
});
