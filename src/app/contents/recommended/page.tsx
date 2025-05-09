'use client';

/* Components */
import { Header } from '@/features/contents/ui/header';
import { useImageMapping } from '@/entities/contents/hooks';
import { StatusBar } from '@/shared/ui/status-bar';
import {
  RecommendedListContainer,
  RecommendedMainSlider,
} from '@/features/contents/ui/recommended';

/* Types */
import { Slide, RecommendedSectionSlide } from '@/shared/types/contents';

/* Styles */
import styles from './page.module.css';

const headerText = '요청하신 콘텐츠가 맞을까요?';
const userName = '디미';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

const iconTypes = ['alert', 'search'];

const recommendedSections: RecommendedSectionSlide[] = [
  {
    id: 1,
    imgUrl: '/assets/images/recommended/sf.svg',
  },
  {
    id: 2,
    imgUrl: '/assets/images/recommended/drama.svg',
  },
  {
    id: 3,
    imgUrl: '/assets/images/recommended/animation.svg',
  },
  {
    id: 4,
    imgUrl: '/assets/images/recommended/comedy.svg',
  },
  {
    id: 5,
    imgUrl: '/assets/images/recommended/action.svg',
  },
  {
    id: 6,
    imgUrl: '/assets/images/recommended/crime.svg',
  },
  {
    id: 7,
    imgUrl: '/assets/images/recommended/entertainment.svg',
  },
  {
    id: 8,
    imgUrl: '/assets/images/recommended/fantasy.svg',
  },
  {
    id: 9,
    imgUrl: '/assets/images/recommended/romance.png',
  },
  {
    id: 10,
    imgUrl: '/assets/images/recommended/thriller.svg',
  },
  {
    id: 11,
    imgUrl: '/assets/images/recommended/documentary.svg',
  },
  {
    id: 12,
    imgUrl: '/assets/images/recommended/horror.svg',
  },
];

const RecommendedPage: React.FC = () => {
  const { getImageSrc } = useImageMapping();
  return (
    <main className={styles.container}>
      <section className={styles.mainContainer}>
        <StatusBar
          statusText="추천"
          iconUrlList={iconUrlList}
          iconTypes={iconTypes}
          pageType="recommended"
        />
        <div>
          <Header
            headerText={headerText}
            userName={userName}
            imageTitle="요청하신 콘텐츠가 맞을까요?"
            pageType="recommended"
            getImageSrc={getImageSrc}
          />
          <RecommendedMainSlider recommendedMainSlides={recommendedSections} />
        </div>
      </section>
      <section>
        {/* 추천 메인  */}
        <RecommendedListContainer getImageSrc={getImageSrc} />
      </section>
    </main>
  );
};

export default RecommendedPage;
