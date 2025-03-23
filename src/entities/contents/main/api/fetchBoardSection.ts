import { PublicApi, type AxiosResponse, AxiosHeaders } from '@/api/core';
import { BoardSectionSlide } from '@/shared/types/contents';

type BoardSectionResponse = {
  data: BoardSectionSlide[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

// 게시판 섹션 데이터 정렬 함수
const sortBoardSections = (
  a: BoardSectionSlide,
  b: BoardSectionSlide,
): number => {
  const likeDiff = (b.likeCount || 0) - (a.likeCount || 0);
  if (likeDiff !== 0) return likeDiff;
  return (b.postViews || 0) - (a.postViews || 0);
};

export const fetchBoardSection = async (
  boardId: number = 1,
): Promise<AxiosResponse<BoardSectionSlide[]>> => {
  try {
    const response = await PublicApi.get<BoardSectionResponse>(
      `/board/${boardId}`,
    ); // 게시판 데이터 조회

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format: data array expected');
    }

    return {
      ...response,
      data: response.data.sort(sortBoardSections).slice(0, 3), // 상위 3개만 선택
    };
  } catch (error) {
    // 임시 더미 데이터
    const dummyData: BoardSectionSlide[] = [
      {
        boardId: 1,
        postIdx: 11,
        userIdx: 26,
        name: '가나1',
        title: '제목업데이트',
        contents:
          '본문입니다. 본문입니다. 본문입니다. 본문입니다.본문입니다. 본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.',
        profileImg:
          'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
        imgUrl: 'https://picsum.photos/60/90?random=1',
        postViews: 0,
        likeCount: 0,
        createdAt: '2024-12-23T20:48:03',
        modifiedAt: '2024-12-23T20:51:03',
      },
      {
        boardId: 1,
        postIdx: 12,
        userIdx: 27,
        name: '가나1',
        title: '두번째 게시글',
        contents: '두번째 본문',
        profileImg:
          'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
        imgUrl: 'https://picsum.photos/60/90?random=2',
        postViews: 5,
        likeCount: 3,
        createdAt: '2024-12-23T20:48:03',
        modifiedAt: '2024-12-23T20:51:03',
      },
      {
        boardId: 1,
        postIdx: 13,
        userIdx: 28,
        name: '가나3',
        title: '세번째 게시글',
        contents: '세번째 본문',
        profileImg:
          'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
        imgUrl: 'https://picsum.photos/60/90?random=3',
        postViews: 5,
        likeCount: 3,
        createdAt: '2024-12-23T20:48:03',
        modifiedAt: '2024-12-23T20:51:03',
      },
    ];

    return {
      data: dummyData,
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
        method: 'GET',
        url: `/board/${boardId}`,
      },
    };
  }
};
