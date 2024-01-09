import axios from 'axios';
import Cassette from '../interfaces/Cassette';
import { useCassettes } from '../contexts/CassettesContext';

const API_URL = 'https://tapedeck-api-fresk.vercel.app/api';
const API_KEY = 'hoiierhkjhsjkherkhwhwe';

const API_LOCAL = './cassettes.json';

const getCassettes = async (): Promise<Cassette[]> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setErrorMsg, setIsLoading } = useCassettes();
  try {
    setIsLoading(true);
    const response = await axios.get(API_URL, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    //const response = await axios.get(API_LOCAL);

    const cassetteData = response.data;
    return transformCassetteData(cassetteData);
  } catch (error) {
    console.error('Error fetching cassettes:', error);
    setErrorMsg('Error fetching cassettes. Please try again later.');
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const transformCassetteData = (cassetteData: any): Cassette[] => {
  return cassetteData.map((cassetteObject: Record<string, Cassette[]>) => {
    const key = Object.keys(cassetteObject)[0];
    const cassetteDetailsArray = cassetteObject[key];

    const cassetteDetails: Cassette = cassetteDetailsArray.reduce(
      (acc, item): Cassette => ({ ...acc, ...item }),
      {} as Cassette
    );

    const { page = '', img = '', thumb = '', playingTime = '', brand = '', type = '', color = '' } = cassetteDetails;

    return { key, page, img, thumb, playingTime, brand, type, color };
  });
};

export { getCassettes };
