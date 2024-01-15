import axios from 'axios';
import Cassette from '../interfaces/Cassette';

// const API_URL = 'https://tapedeck-api-fresk.vercel.app/api';
// const API_KEY = 'hoiierhkjhsjkherkhwhwe';

const API_LOCAL = './cassettes.json';

const getCassettesService = async (): Promise<Cassette[]> => {
  
  try {
    // const response = await axios.get(API_URL, {
    //   headers: {
    //     'x-api-key': API_KEY,
    //   },
    // });
    const response = await axios.get(API_LOCAL);

    const cassetteData = response.data;
    return transformCassetteData(cassetteData);
  } catch (error) {
    console.error('Error fetching cassettes:', error);
    throw error;
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

export { getCassettesService };
