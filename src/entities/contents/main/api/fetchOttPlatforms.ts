import { PublicApi, type AxiosResponse, AxiosHeaders } from '@/api/core';
import { OttPlatform } from '@/_types/contents';

export const fetchOttPlatforms = async (
  contentId: string,
): Promise<AxiosResponse<OttPlatform[]>> => {
  try {
    const response = await PublicApi.post<OttPlatform[]>(
      `/contents/ott?contentId=${contentId}`
    );
    console.log('API OTT Response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching OTT platforms:', error);
    return {
      data: [],
      status: 500,
      statusText: 'Error',
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() },
    };
  }
};
