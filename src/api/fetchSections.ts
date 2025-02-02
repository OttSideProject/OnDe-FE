import Api from './core/Api';
import { SectionsResponse } from '@/_types/contents/contents';
import { fetchers } from '@/__mocks__/helpers/fetchers';

export const fetchSections = async (id: number): Promise<SectionsResponse> => {
	try {
		 if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
       // MSW를 사용하여 API mocking을 하는 경우, fetchSections 함수를 사용할 때 아래 코드가 실행됩니다.
       return await fetchers.fetchSections(id);
     } else {
       // 실제 API 호출
       const response = await Api.get<SectionsResponse>(`/sections`, {
         baseURL: process.env.NEXT_PUBLIC_BASE_END_POINT,
         params: { id },
       });
       return response.data;
     }
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch sections');
	}

};
