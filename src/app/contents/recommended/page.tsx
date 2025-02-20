/* Components */
import Header from '@/components/contents/header/Header';
import StatusBar from '@/components/shared/status-bar/StatusBar';
import RecommendedListContainer from '@/components/contents/RecommendedListContainer';
import RecommendedMainSlider from '@/components/contents/RecommendedMainSlider';

/* Types */
import { Slide, RecommendedSectionSlide } from '@/_types/contents/contents';

/* Styles */
import styles from './page.module.css';

const headerText = '요청하신 콘텐츠가 맞을까요?';
const userName = '디미';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

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

const RecommendedPage: React.FC = ({}) => {
  return (
    <main className={styles.container}>
      <StatusBar statusText="추천" iconUrlList={iconUrlList} />
      <section>
        <div className={styles.mainContainer}>
          <Header
            headerText={headerText}
            userName={userName}
            imageTitle="요청하신 콘텐츠가 맞을까요?"
            pageType="recommended"
          />
          <RecommendedMainSlider recommendedMainSlides={recommendedSections} />
        </div>
        {/* 추천 메인  */}
        <RecommendedListContainer />
      </section>
    </main>
  );
};

export default RecommendedPage;
