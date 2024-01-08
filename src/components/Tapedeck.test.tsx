// src/Tapedeck.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock axios
import Tapedeck from './Tapedeck';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Tapedeck Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  it('renders Tapedeck component', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] }); // Mock API response

    render(<Tapedeck />);

    // You can add more assertions based on your component structure
    expect(screen.getByText('Tapedeck')).toBeInTheDocument();

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  });

});
