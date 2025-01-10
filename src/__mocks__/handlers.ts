import { http, HttpResponse } from 'msw';
import sectionsData from './data/sections.json';
// const API_DOMAIN = 'http://localhost:3000';

export const handlers = [
  http.get('/api/sections', ({ request }) => {
    const url = new URL(request.url); // 요청 URL 객체 생성
    const sectionId = Number(url.searchParams.get('id')) || 1;
		const section = sectionsData.sections.find((section) => section.id === sectionId);
		if (!section) {
			return new HttpResponse('Not Found', { status: 404 });
		}

    // 응답 데이터 구성
    const response = {
      pageNo: sectionId,
      totalPages: sectionsData.sections.length,
      totalItems: sectionsData.totalItems,
      sections: [section],
    };
    return HttpResponse.json(response);
  }),
];
