import axios from 'axios';
import { SectionsResponse, RecommendedResponse } from '@/shared/types/contents';

const fetchSections = async (id: number): Promise<SectionsResponse> => {
  const response = await axios.get('/api/sections', {
    params: { id },
  });
  console.log('sections', response.data);
  return response.data;
};

const fetchRankings = async (type: string, ott: string, id: number) => {
  const response = await axios.get('/api/contents/ranking/ott', {
    params: { type, ott, id },
  });
  console.log('rankings', response.data);
  return response.data;
};

const fetchRecommended = async (id: number): Promise<RecommendedResponse> => {
  const response = await axios.get('/api/contents/recommended', {
    params: { id },
  });
  console.log('recommended', response.data);
  return response.data;
};

export const fetchers = { fetchSections, fetchRankings, fetchRecommended };
