import { http, HttpResponse } from 'msw';
import sectionsData from './data/sections.json';
import ottRankingsData from './data/ott_rankings.json';
// const API_DOMAIN = 'http://localhost:3000';

const sectionHandlers = [
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

const rankingHandlers = [
  http.get('/contents/ranking/ott', ({ request }) => {
    // 요청 파라미터 가져오기
    const url = new URL(request.url);
    const type = url.searchParams.get('type'); // 랭킹 타입
    const ott = url.searchParams.get('ott');
    const rankingId = Number(url.searchParams.get('id')) || 1;

    // Validate parameters
    if (!ott || !type || !ottRankingsData[ott]) {
      return new HttpResponse('Invalid parameters', { status: 400 });
    }

		const rankingsData = ottRankingsData[ott][type];

		if (!rankingsData) {
			return new HttpResponse('Not Found', { status: 404 });
		}

		const { rankings, totalPages, totalItems } = rankingsData;
    const pageSize = 12;
		const startIndex = (rankingId - 1) * pageSize;
    const endIndex = rankingId * pageSize;
    const paginatedRankings = rankings.slice(startIndex, endIndex);

    // 데이터가 없으면 404 에러 반환
    if (paginatedRankings.length === 0) {
      return new HttpResponse('No Content', { status: 204 });
    }

    const response = {
      pageNo: rankingId,
      totalPages: rankingsData.rankings.length,
      totalItems: rankingsData.totalItems,
      rankings: paginatedRankings,
    };
    return HttpResponse.json(response);
  }),
];


// 전체 핸들러 통합
export const handlers = [...sectionHandlers, ...rankingHandlers];


