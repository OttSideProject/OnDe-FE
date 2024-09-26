'use client';

import { useParams } from 'next/navigation';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { UseCustomQuery } from '@/hooks/useCustomQuery';

import { DetailData } from '@/_types/contents/contents';

import styles from './DetailPage.module.css';

/* 더미 데이터를 가져오는 함수 */
const fetchDetailData = async (
  id: string,
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

const DetailComponent: React.FC<{}> = () => {
  const params = useParams(); // 동적 경로에서 id를 가져옴
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // id를 string으로 변환
  /* useCustomQuery를 사용하여 데이터 페칭 */
  const { data, error, isLoading } = UseCustomQuery(
    [id], // queryKey
    () => fetchDetailData(id), // queryCallBack
    { queryKey: [id] },
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

export default DetailComponent;
