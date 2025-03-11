import { PublicApi, type AxiosResponse, AxiosHeaders } from '@/api/core';
import { DetailData } from '@/_types/contents/contents';

export const getDummyData = (): DetailData => ({
  contentId: 'C_1450489',
  title: '힙합 에볼루션',
  summary:
    '지금부터 힙합의 산 역사를 만난다! 태동기부터 현재까지, 당대의 MC와 디제이, 업계 거물들이 전하는 힙합의 혁신들. 흥겨운 비트와 인터뷰로 가득한 다큐멘터리 시리즈.',
  genres: ['음악', '사회', '다큐멘터리1'],
  age: '청불',
  ctype: '다큐멘터리, 시리즈',
  released: '2018',
  imageUrl: 'https://picsum.photos/375/375?random=1',
  actors: ['도하석', '김예운', '조윤우', '고민주', '신혜원'],
  director: '피트 닥터',
  runningTime: '96',
});

export const fetchDetailData = async (
  id: string,
): Promise<AxiosResponse<DetailData>> => {
  try {
    if (!id || id === 'undefined' || id === 'null') {
      throw new Error(`유효하지 않은 콘텐츠 ID입니다: ${id}`);
    }

    console.log('콘텐츠 상세 정보 요청:', id, typeof id);

    const response = await PublicApi.get<DetailData>(
      `/contents/content?contentId=${id}`,
    );

    console.log('API 응답:', response);

    if (!response.data || !response.data.contentId || !response.data.title) {
      throw new Error('유효하지 않은 응답 형식입니다.');
    }

    // API 응답에 imageUrl이 없으면 더미 이미지 URL 사용
    if (!response.data.imageUrl) {
      response.data.imageUrl = getDummyData().imageUrl;
    }

    return response;
  } catch (error) {
    console.error('콘텐츠 상세 정보 조회 실패:', {
      error,
      id,
      type: typeof id,
    });
    return {
      data: getDummyData(),
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      } as any,
    };
  }
};
