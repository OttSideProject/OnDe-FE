'use client';

import { useParams } from 'next/navigation';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { UseCustomQuery } from '@/hooks/useCustomQuery';

import { DetailData } from '@/_types/contents/contents';

import Button from '@/components/shared/button-group/Button';

import styles from './DetailComponent.module.css';

/* 더미 데이터를 가져오는 함수 */
const fetchDetailData = async (
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
      <figure className={styles.imageContainer}>
        <img src={data?.imageUrl} alt={data?.title} />
        <figcaption>
          <h1 className={styles.title}>{data?.title}</h1>
          <>
            <h2 className={styles.info}>
              {data?.info.map((item, index) => (
                <span key={index}>
                  {typeof item === 'string' ? (
                    item
                  ) : (
                    <img src={item.src} alt={item.alt} />
                  )}
                </span>
              ))}
            </h2>
          </>
          <p className={styles.description}>{data?.description}</p>
        </figcaption>
      </figure>
      <div className={styles.bottomContainer}>
        {/* 첫 번째 버튼 */}
        <Button
          variant="default"
          width={135}
          text="모아보기"
          iconUrl="/assets/images/icons/collect-box.svg"
          onClick={() => alert('Second Button Clicked!')}
        >
          모아보기
        </Button>
        {/* 두 번째 버튼 */}
        <Button
          variant="primary"
          width={210}
          text="OTT 선택하기"
          onClick={() => alert('Second Button Clicked!')}
        >
          OTT 선택하기
        </Button>
      </div>
    </div>
  );
};

export default DetailComponent;
