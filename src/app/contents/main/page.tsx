import Link from 'next/link';
/* Components */
import Header from '@/components/contents/header/Header';
import MainSlider from '@/components/contents/MainSlider';
import SectionSliderContainer from '@/components/contents/SectionSliderContainer';
import StatusBar from '@/components/shared/status-bar/StatusBar';

/* Types */
import { Slide, BoardSectionSlide } from '@/_types/contents/contents';

/* Styles */
import styles from './page.module.css';
import BoardSectionSlider from '@/components/contents/BoardSectionSlider';

const headerText = '오늘의 Dimi’s pick ';

const iconUrl = '/assets/images/icons/dimi-eyes-on.svg';

const logoUrl = '/assets/images/icons/logo-ond.svg';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

const slides: Slide[] = [
  {
    id: 1,
    title: '더 인플루언서',
    subTitle: ['흥미진진한', '시리즈', '서바이벌'],
    url: 'https://picsum.photos/240/360?random=1',
  },
  {
    id: 2,
    title: '에일리언',
    subTitle: ['독특한', '서스펜스', 'SF'],
    url: 'https://picsum.photos/240/360?random=2',
  },
  {
    id: 3,
    title: '귀공자',
    subTitle: ['독특한', '서스펜스', 'SF'],
    url: 'https://picsum.photos/240/360?random=3',
  },
  {
    id: 4,
    title: 'title 4',
    subTitle: ['흥미진진한', '시리즈', '서바이벌'],
    url: 'https://picsum.photos/240/360?random=4',
  },
  {
    id: 5,
    title: 'title 5',
    subTitle: ['흥미진진한', '시리즈', '서바이벌'],
    url: 'https://picsum.photos/240/360?random=5',
  },
];

const boardSections: BoardSectionSlide[] = [
  {
    id: 1,
    name: '가나1',
    profileImg:
      'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
    imgUrl: 'https://picsum.photos/60/90?random=1',
    detailUrl: '/board/1',
    title:
      '제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.제목입니다.',
    description:
      '본문입니다. 본문입니다. 본문입니다. 본문입니다.본문입니다. 본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.',
    likeCount: 27,
    messageCount: 110,
  },
  {
    id: 2,
    name: '다라2',
    imgUrl: 'https://picsum.photos/60/90?random=2',
    detailUrl: '/board/2',
    title: '제목입니다.',
    description:
      '본문입니다. 본문입니다. 본문입니다. 본문입니다.본문입니다. 본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.',
    likeCount: 3,
    messageCount: 0,
  },
  {
    id: 3,
    name: '가나3',
    imgUrl: 'https://picsum.photos/60/90?random=3',
    detailUrl: '/board/3',
    title: '제목입니다.',
    description:
      '본문입니다. 본문입니다. 본문입니다. 본문입니다.본문입니다. 본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.',
    likeCount: 20,
    messageCount: 30,
  },
  {
    id: 4,
    name: '다라4',
    imgUrl: 'https://picsum.photos/60/90?random=4',
    detailUrl: '/board/4',
    title: '제목입니다.',
    description:
      '본문입니다. 본문입니다. 본문입니다. 본문입니다.본문입니다. 본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.',
    likeCount: 2,
    messageCount: 10,
  },
  {
    id: 5,
    name: '마바5',
    imgUrl: 'https://picsum.photos/60/90?random=5',
    detailUrl: '/board/5',
    title: '제목입니다.',
    description:
      '본문입니다. 본문입니다. 본문입니다. 본문입니다.본문입니다. 본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.본문입니다.본문입니다. 본문입니다. 본문입니다.',
    likeCount: 0,
    messageCount: 3,
  },
];

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <StatusBar logoUrl={logoUrl} iconUrlList={iconUrlList} />
      <Header headerText={headerText} iconUrl={iconUrl} />
      <MainSlider slides={slides} />
      <BoardSectionSlider boardSectionSlides={boardSections} />
      <SectionSliderContainer />
      <div className={styles.recommendContainer}>
        <p>
          <strong>원하는 콘텐츠를 찾지 못하셨나요? </strong> <br />
          <strong>Dimi</strong>가 직접 추천하는 당신만을 위한 콘텐츠를
          확인해보세요.
        </p>
      </div>
      <Link href="" title="추천 바로가기" className={styles.fullButton}>
        추천 바로가기
      </Link>
    </div>
  );
};

export default HomePage;
