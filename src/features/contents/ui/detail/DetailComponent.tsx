'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DetailData } from '@/_types/contents/contents';
import { ageImage } from '@/features/shared/utils/ageImage';
import { Button } from '@/features/shared/ui/button-group';
import { DropDownOptions } from '@/features/shared/ui/action-bar';
import { DimmedBackground } from '@/features/shared/ui/dimmed-background';
import { useDropDownStore } from '@/entities/contents/main/stores';
import { BtnDetailInnerChildStyle } from '@/features/shared/ui/button-group';
import { ToggleIconButton } from '@/features/shared/ui/toggle';
import styles from './DetailComponent.module.css';

type DetailComponentProps = {
  detailData: DetailData;
};

const DetailComponent: React.FC<DetailComponentProps> = ({ detailData }) => {
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

  const router = useRouter();

  const goMypage = () => {
    router.push('/users/mypage');
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
            height={580}
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
          </h2>
          <p className={styles.description}>{detailData.summary}</p>
        </figcaption>
      </figure>
      <div className={styles.bottomContainer}>
        <BtnDetailInnerChildStyle>
          <Button
            variant="default"
            iconUrl="/assets/images/icons/collect-box.svg"
            onClick={goMypage}
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
