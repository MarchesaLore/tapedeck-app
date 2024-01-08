// Tapedeck.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'; // Mock axios
import Tapedeck from './Tapedeck';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData = [
  {
    "key": "1",
    "brand": "Brand1",
    "color": "Red",
    "playingTime": "30min",
    "type": "Type1"
  },
  {
    "key": "2",
    "brand": "Brand2",
    "color": "Blue",
    "playingTime": "60min",
    "type": "Type2"
  },
  {
    "key": "3",
    "brand": "Brand2",
    "color": "Blue",
    "playingTime": "60min",
    "type": "Type2"
  },
  {
    "key": "4",
    "brand": "Brand2",
    "color": "Blue",
    "playingTime": "60min",
    "type": "Type2"
  }

];


describe('Tapedeck Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  it('renders Tapedeck component with default values', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData }); // Mock API response

    render(<Tapedeck />);

    expect(screen.getByText('Tapedeck')).toBeInTheDocument();
    expect(screen.getByLabelText('Brand:')).toBeInTheDocument();
    expect(screen.getByLabelText('Color:')).toBeInTheDocument();
    expect(screen.getByLabelText('Play Time:')).toBeInTheDocument();
    expect(screen.getByLabelText('Type:')).toBeInTheDocument();

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  });

  it('changes items per page value', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData }); // Mock API response

    render(<Tapedeck />);

    const itemsPerPageInput = screen.getByLabelText('Items per Page:');
    userEvent.type(itemsPerPageInput, '25');


    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  });

  it('changes filter and updates results', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData }); // Mock API response

    render(<Tapedeck />);

    const brandSelect = screen.getByLabelText('Brand:') as HTMLSelectElement;
    userEvent.selectOptions(brandSelect, 'Brand1');

    expect(brandSelect.value).toBe('Brand1');

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  });

});

