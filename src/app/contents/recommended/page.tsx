import Link from 'next/link';
/* Components */
import Header from '@/components/contents/header/Header';
import RecommendedListContainer from '@/components/contents/RecommendedListContainer';
import StatusBar from '@/components/shared/status-bar/StatusBar';

/* Types */

/* Styles */
import styles from './page.module.css';

const headerText = '요청하신 콘텐츠가 맞을까요?';
const userName = '디미';

const iconUrlList = [
  '/assets/images/icons/alert-icon.svg',
  '/assets/images/icons/find-icon.svg',
];

const RecommendedPage: React.FC = ({}) => {
  return (
    <main className={styles.container}>
      <StatusBar statusText="추천" iconUrlList={iconUrlList} />
      <section>
        <Header
          headerText={headerText}
          userName={userName}
          imageTitle="요청하신 콘텐츠가 맞을까요?"
          pageType="recommended"
        />
        {/* 추천 메인  */}
        {/* todo */}
        <RecommendedListContainer />
      </section>
    </main>
  );
};

export default RecommendedPage;
