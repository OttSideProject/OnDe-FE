import axios from 'axios';
import { SectionsResponse } from '@/_types/contents/contents';

export const fetchSections = async (id: number): Promise<SectionsResponse> => {
  const response = await axios.get('/api/sections',{
		params: { id },
	});
  console.log(response.data);
  return response.data;
};
