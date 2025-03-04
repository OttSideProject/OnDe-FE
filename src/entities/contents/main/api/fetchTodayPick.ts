import Api from '@/api/core/Api';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { TodayPickContent } from '@/_types/contents/contents';

export const fetchTodayPick = async (): Promise<
  AxiosResponse<TodayPickContent[]>
> => {
  try {
    const response = await Api.post<TodayPickContent[]>(
      '/contents/content/todayPick',
    );
    return response;
  } catch (error) {
    // 임시 더미 데이터
    const dummyData: TodayPickContent[] = [
      {
        contentId: 'C_2884139',
        title: '좋지 아니한가',
        age: '15+',
        contentImg: 'https://picsum.photos/240/360?random=1',
        genres: ['청춘', '드라마', '코미디'],
        rank: 0,
      },
      // ... 필요한 만큼 더미 데이터 추가
    ];

    return {
      data: dummyData,
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
        method: 'POST',
        url: '/contents/content/todayPick',
      },
    };
  }
};
