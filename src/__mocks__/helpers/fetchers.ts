import axios from 'axios';
import { Section } from '@/_types/contents/contents';

export const fetchSections = async (): Promise<Section[]> => {
  const response = await axios.get('/api/sections');
	console.log(response.data);
  return response.data;
};
