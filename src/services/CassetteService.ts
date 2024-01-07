import axios from 'axios';
import Cassette from '../interfaces/Cassette';

const API_URL = '/cassettes.json'; // Will Update with your actual API URL

const fetchCassetteData = async (): Promise<Cassette[]> => {

  try {
    // const response = await axios.get('API_URL', { //to do: add API URL
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'key': 'API_KEY' //to do: add API key            
    //     },
    // }); 

    const response = await axios.get(API_URL);
    const cassetteData = response.data;
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
