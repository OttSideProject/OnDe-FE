'use client';

import { useParams } from 'next/navigation';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { UseCustomQuery } from '@/hooks/useCustomQuery';

import { DetailData } from '@/_types/contents/contents';

import styles from './DetailPage.module.css';

/* 더미 데이터를 가져오는 함수 */
const fetchDetailData = async (
  id: number,
): Promise<AxiosResponse<DetailData>> => {
  const detailData: DetailData = {
    id,
    title: `Slide Title ${id}`,
    description: `This is a description for slide ${id}`,
    imageUrl: `https://picsum.photos/300/500?random=${id}`,
  };

  /* AxiosResponse와 유사한 형태로 반환 */
  return {
    data: detailData,
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(), // AxiosHeaders로 빈 헤더 생성
    config: {
      headers: new AxiosHeaders(), // 필요한 헤더 값 설정
      method: 'GET',
      url: `/api/details/${id}`,
    } /* AxiosRequestConfig로 지정 */,
  };
};

const DetailPage: React.FC<{ queryKeyPrefix: string }> = ({
  queryKeyPrefix,
}) => {
  const { id } = useParams(); // 동적 경로에서 id를 가져옴

  /* id를 number로 변환 */
  const parsedId = Number(id);

  /* parsedId가 숫자가 아닐 때 조건 처리 */
  if (isNaN(parsedId) || parsedId <= 0) {
    return <p>유효하지 않은 ID입니다.</p>;
  }

  /* useCustomQuery를 사용하여 데이터 페칭 */
  const { data, error, isLoading } = UseCustomQuery(
    [queryKeyPrefix, parsedId], // queryKey
    () => fetchDetailData(parsedId), // queryCallBack
    { queryKey: [queryKeyPrefix, parsedId], enabled: parsedId > 0 },
    /* queryKeyPrefix를 이용해 구분 */
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <img src={data?.imageUrl} alt={data?.title} />
    </div>
  );
};

export default DetailPage;
