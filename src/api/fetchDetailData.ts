import { AxiosHeaders, AxiosResponse } from 'axios';
import { DetailData } from '@/_types/contents/contents';

export const fetchDetailData = async (
  id: string,
): Promise<AxiosResponse<DetailData>> => {
  const detailData: DetailData = {
    id,
    title: `콘텐츠 제목`,
    info: [
      '2024',
      {
        type: 'image',
        src: '/assets/images/icons/all-view-icon.svg',
        alt: 'all',
      },
      '96분',
    ],
    description: `줄거리입니다.줄거리입니다.줄거리입니다.줄거리입니다.줄거리입니다.줄거리입니다.줄거리입니다.줄거리입니다.줄거리입니다.`,
    imageUrl: `https://picsum.photos/375/375?random=${id}`,
  };

  return {
    data: detailData,
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config: {
      headers: new AxiosHeaders(),
      method: 'GET',
      url: `/api/details/${id}`,
    },
  };
}; 