import Link from 'next/link';
/* Components */
import Header from '@/components/contents/header/Header';
import RankingMainContainer from '@/components/contents/RankingMainContainer';
import RankingSubListContainer from '@/components/contents/RankingSubListContainer';
import StatusBar from '@/components/shared/status-bar/StatusBar';

/* Types */
import { Slide } from '@/_types/contents/contents';

/* Styles */
import styles from './page.module.css';

const headerText = '전체 콘텐츠 랭킹';

const iconUrl = '/assets/images/icons/crown.svg';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

const rankingTopList: Slide[] = [
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
];

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <StatusBar statusText="랭킹" iconUrlList={iconUrlList} />
      <Header headerText={headerText} iconUrl={iconUrl} />
      <RankingMainContainer slides={rankingTopList} />
      <RankingSubListContainer />
    </div>
  );
};

export default HomePage;
