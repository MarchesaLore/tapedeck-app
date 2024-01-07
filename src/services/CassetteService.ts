import axios from 'axios';
import Cassette from '../interfaces/Cassette';

const API_URL = '/cassettes.json'; // Will Update with your actual API URL
const API_URL_real = 'https://tapedeck-api-fresk.vercel.app/api';
const API_KEY = 'hoiierhkjhsjkherkhwhwe'; 

const fetchCassetteData = async (): Promise<Cassette[]> => {

  const cachedData = sessionStorage.getItem('cassetteData');
  const cachedCassetteData = cachedData ? JSON.parse(cachedData) : [];
  
  if (cachedCassetteData.length) {
    return transformCassetteData(cachedCassetteData);
  }
  try {
    const response = await axios.get(API_URL_real, { 
        headers: {
            'x-api-key': API_KEY        
        },
    }); 
    //const response = await axios.get(API_URL);
    const cassetteData = response.data;
    sessionStorage.setItem('cassetteData', JSON.stringify(cassetteData));


    return transformCassetteData(cassetteData);
  } catch (error) {
    console.error('Error fetching cassette data:', error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

const transformCassetteData = (cassetteData: any): Cassette[] => {
  // Extract cassette details from the unconventional structure
  const formattedCassettes = cassetteData.map(
    (cassetteObject: Record<string, Cassette[]>) => {
      const key = Object.keys(cassetteObject)[0];
      const cassetteDetailsArray = cassetteObject[key];

      const cassetteDetails: Cassette = cassetteDetailsArray.reduce(
        (acc, item): Cassette => ({ ...acc, ...item }),
        {} as Cassette
      );

      const { page = '', img = '', thumb = '', playingTime = '', brand = '', type = '', color = '' } = cassetteDetails;

      return { page, img, thumb, playingTime, brand, type, color };
    }
  );
  return formattedCassettes;
};

export { fetchCassetteData };
