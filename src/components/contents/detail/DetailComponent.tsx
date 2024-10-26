'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { UseCustomQuery } from '@/hooks/useCustomQuery';

import { DetailData } from '@/_types/contents/contents';

import Button from '@/components/shared/button-group/Button';
import DropDownOptions from '@/components/shared/action-bar/DropDownOptions';
import { DimmedBackground } from '@/components/shared/dimmed-background/DimmedBackground';

import useDropDownStore from '@/stores/useDropDownStore';

import styles from './DetailComponent.module.css';
import { BtnDetailInnerFirstChildStyle, BtnDetailInnerLastChildStyle } from '@/components/shared/button-group/ButtonStyles';

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
  const { isDropDownOpen, openDropDown, closeDropDown } = useDropDownStore();

  useEffect(() => {
    if (isDropDownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDropDownOpen]);

  const options = [
    {
      id: 1,
      link: 'https://www.netflix.com/kr/',
      url: '/assets/images/ott_logos/netflix-logo.svg',
    },
    {
      id: 2,
      link: 'https://www.tving.com/',
      url: '/assets/images/ott_logos/tving-logo.svg',
    },
    {
      id: 3,
      link: 'https://watcha.com/',
      url: '/assets/images/ott_logos/watcha-logo.svg',
    },
    {
      id: 4,
      link: 'https://www.disneyplus.com/',
      url: '/assets/images/ott_logos/disney-plus-logo.svg',
    },
    {
      id: 5,
      link: 'https://www.wavve.com/',
      url: '/assets/images/ott_logos/wavve-logo.svg',
    },
    {
      id: 6,
      link: 'https://laftel.net/',
      url: '/assets/images/ott_logos/laftel-logo.svg',
    },
    {
      id: 7,
      link: 'https://www.primevideo.com/-/ko',
      url: '/assets/images/ott_logos/prime-video-logo.svg',
    },
    {
      id: 8,
      link: 'https://play.coupang.com/',
      url: '/assets/images/ott_logos/coupang-play-logo.svg',
    },
  ];

  const handleOptionSelect = (id: number) => {
    closeDropDown();
  };
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
      {/* DropDown이 열려있을 때 DimmedBackground 표시 */}
      {isDropDownOpen && (
        <>
          <DimmedBackground onClick={closeDropDown} />
          <DropDownOptions
            options={options}
            height={580}
            title="시청하실 ott 를 선택하세요."
          />
        </>
      )}
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
        <BtnDetailInnerFirstChildStyle>
          <Button
            variant="default"
            iconUrl="/assets/images/icons/collect-box.svg"
            onClick={() => alert('Second Button Clicked!')}
          >
            모아보기
          </Button>
        </BtnDetailInnerFirstChildStyle>

        {/* 두 번째 버튼 */}
        <BtnDetailInnerLastChildStyle>
          <Button variant="primary" onClick={openDropDown}>
            OTT 선택하기
          </Button>
        </BtnDetailInnerLastChildStyle>
      </div>
    </div>
  );
};

export default DetailComponent;
