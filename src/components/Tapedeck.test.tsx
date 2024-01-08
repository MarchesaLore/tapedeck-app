import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'; 
import Tapedeck from './Tapedeck';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData = [
  {
      "c4b9a66bc9": [
          {
              "page": "http://www.tapedeck.org/400/maxell_mx_100_mg1301.php"
          },
          {
              "img": "http://www.tapedeck.org/400/maxell_mx_100_mg1301.jpg"
          },
          {
              "thumb": "http://www.tapedeck.org/400/maxell_mx_100_mg1301-thumb.jpg"
          },
          {
              "playingTime": "100 minutes"
          },
          {
              "type": "Metal"
          },
          {
              "color": "Black"
          },
          {
              "brand": "Maxell"
          }
      ]
  },
  {
      "23840c06c6": [
          {
              "page": "http://www.tapedeck.org/400/tdk_fe_90_080417.php"
          },
          {
              "img": "http://www.tapedeck.org/400/tdk_fe_90_080417.jpg"
          },
          {
              "thumb": "http://www.tapedeck.org/400/tdk_fe_90_080417-thumb.jpg"
          },
          {
              "playingTime": "090 minutes"
          },
          {
              "type": "Ferro"
          },
          {
              "color": "Grey"
          },
          {
              "brand": "TDK"
          }
      ]
  },
  {
      "a798599042": [
          {
              "page": "http://www.tapedeck.org/400/Anvic.php"
          },
          {
              "img": "http://www.tapedeck.org/400/Anvic.jpg"
          },
          {
              "thumb": "http://www.tapedeck.org/400/Anvic-thumb.jpg"
          },
          {
              "playingTime": "090 minutes"
          },
          {
              "type": "Chrome"
          },
          {
              "color": "Grey"
          },
          {
              "brand": "Anvic"
          }
      ]
  },
  {
      "df6067a0c9": [
          {
              "page": "http://www.tapedeck.org/400/tdk_d_46_071126.php"
          },
          {
              "img": "http://www.tapedeck.org/400/tdk_d_46_071126.jpg"
          },
          {
              "thumb": "http://www.tapedeck.org/400/tdk_d_46_071126-thumb.jpg"
          },
          {
              "playingTime": "048 minutes"
          },
          {
              "type": "Ferro"
          },
          {
              "color": "Grey"
          },
          {
              "brand": "TDK"
          }
      ]
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

  it('changes filter brand value to TDK, should come back 2 results', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData }); // Mock API response
  
    render(<Tapedeck />);
  
    const BrandInput = screen.getByLabelText('Brand:');
    
    userEvent.selectOptions(BrandInput, 'TDK');
  
    await waitFor(() => 
      expect(BrandInput).toHaveValue('TDK')
    );
  
    await waitFor(() => 
      expect(screen.getAllByRole('row')).toHaveLength(2)
    );
  });

  it('changes items per page value to 2, should come back 2 items', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockData }); // Mock API response
  
    render(<Tapedeck />);
  
    const itemsPerPageInput = screen.getByLabelText('Items per Page:');
  
    // Clear existing value
    userEvent.clear(itemsPerPageInput);
  
    // Type the new value
    userEvent.type(itemsPerPageInput, '2');
  
    await waitFor(() => 
      expect(itemsPerPageInput).toHaveValue(2)
    );
  
    await waitFor(() => 
      expect(screen.getAllByRole('row')).toHaveLength(2)
    );
  });
  

});

