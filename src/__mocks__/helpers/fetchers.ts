import axios from 'axios';
import { SectionsResponse } from '@/_types/contents/contents';

const fetchSections = async (id: number): Promise<SectionsResponse> => {
  const response = await axios.get('/api/sections',{
		params: { id },
	});
  console.log("sections",response.data);
  return response.data;
};

const fetchRankings = async (type: string ,ott: string, id: number) => {
	const response = await axios.get('/contents/ranking/ott', {
		params: { type, ott, id },
	});
	console.log("rankings",response.data);
	return response.data;
}

export const fetchers = { fetchSections, fetchRankings };
