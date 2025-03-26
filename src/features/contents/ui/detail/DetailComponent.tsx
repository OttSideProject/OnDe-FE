'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DetailData } from '@/shared/types/contents';
import { ageImage } from '@/shared/utils/ageImage';
import { useDropDownStore } from '@/entities/contents/main/stores';
import { useOttPlatformStore } from '@/entities/contents/detail/stores';
import { fetchOttPlatforms } from '@/entities/contents/main/api';
import { BtnDetailInnerChildStyle } from '@/shared/ui/button-group';
import { ToggleIconButton } from '@/shared/ui/toggle';
import { Button } from '@/shared/ui/button-group';
import { DropDownOptions } from '@/shared/ui/action-bar';
import { DimmedBackground } from '@/shared/ui/dimmed-background';
import styles from './DetailComponent.module.css';

type DetailComponentProps = {
  detailData: DetailData;
};

const ottLogos: Record<string, string> = {
  netflix: '/assets/images/ott_logos/netflix-logo.svg',
  tving: '/assets/images/ott_logos/tving-logo.svg',
  watcha: '/assets/images/ott_logos/watcha-logo.svg',
  'disney+': '/assets/images/ott_logos/disney-plus-logo.svg',
  wavve: '/assets/images/ott_logos/wavve-logo.svg',
  laftel: '/assets/images/ott_logos/laftel-logo.svg',
  'prime video': '/assets/images/ott_logos/prime-video-logo.svg',
  'coupang play': '/assets/images/ott_logos/coupang-play-logo.svg',
};

const DetailComponent: React.FC<DetailComponentProps> = ({ detailData }) => {
  const { isDropDownOpen, openDropDown, closeDropDown } = useDropDownStore();
  const { platforms, setPlatforms } = useOttPlatformStore();
  const router = useRouter();
  const [lastAlertTime, setLastAlertTime] = useState<number>(0);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await fetchOttPlatforms(detailData.contentId);
      setPlatforms(response.data);
    };
    fetchPlatforms();
  }, [detailData.contentId, setPlatforms]);

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

  const options = platforms.map((platform, index) => ({
    id: index + 1,
    link: platform.content_link,
    url: ottLogos[platform.platform.toLowerCase()] || '',
  }));

  const handleOptionSelect = (id: number) => {
    closeDropDown();
  };

  const goMypage = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastAlertTime < 500) return; // 500ms 내에 중복 알림 방지
    
    setLastAlertTime(now);
    alert('준비중입니다');
    return;
    // router.push('/users/mypage');
  };

  return (
    <section className={styles.container}>
      {isDropDownOpen && (
        <div
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <DimmedBackground onClick={closeDropDown} />
          <DropDownOptions
            options={options}
            title="시청하실 ott 를 선택하세요."
          />
        </div>
      )}
      <figure className={styles.imageContainer}>
        <Image
          src={detailData.imageUrl || ''}
          alt={detailData.title}
          width={375}
          height={375}
          priority
        />
        <ToggleIconButton />
        <figcaption>
          <h1 className={styles.title}>{detailData.title}</h1>
          <h2 className={styles.info}>
            {detailData.released}
            <span className={styles.ageImageContainer}>
              <Image
                src={ageImage(detailData.age, 'detail')}
                alt={`${detailData.age}세 이용가`}
                width={20}
                height={20}
              />
            </span>
            {detailData.runningTime && `${detailData.runningTime}분`}
          </h2>
          <p className={styles.description}>{detailData.summary}</p>
        </figcaption>
      </figure>
      <div className={styles.bottomContainer}>
        <BtnDetailInnerChildStyle>
          <Button
            variant="default"
            iconUrl="/assets/images/icons/collect-box.svg"
            onClick={(e) => goMypage(e)}
          >
            모아보기
          </Button>
        </BtnDetailInnerChildStyle>

        <BtnDetailInnerChildStyle>
          <Button variant="primary" onClick={openDropDown}>
            OTT 선택하기
          </Button>
        </BtnDetailInnerChildStyle>
      </div>
    </section>
  );
};

export default DetailComponent;
