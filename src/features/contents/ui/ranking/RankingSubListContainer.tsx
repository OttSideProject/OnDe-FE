import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/* Types */
import { Ranking } from '@/shared/types/contents';

/* Utils */
import { ageImage } from '@/shared/utils/ageImage';

/* Stores */
import { useRankingStore } from '@/entities/contents/stores/ranking';

/* Components */
import { SubHeader } from '@/features/contents/ui/header';
import { ImageSubList } from '@/features/contents/ui/ranking';

/* Styles */
import styles from './RankingSubListContainer.module.css';

type RankingSubListContainerProps = {
  category: string | null; // 카테고리
  getImageSrc: (
    title: string,
    pageType: 'contentMain' | 'ranking' | 'recommended',
  ) => string;
};

const RankingSubListContainer: React.FC<RankingSubListContainerProps> = ({
  category = '', // 기본값은 빈 문자열
  getImageSrc,
}) => {
  const [effectiveCategory, setEffectiveCategory] = useState<string>(
    category || '',
  );

  // useRankingStore 사용
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    dataState,
    isLoading,
    getSubListRankings,
  } = useRankingStore();

  // 4위 이하 랭킹 데이터 가져오기
  const subListRankings = getSubListRankings();

  const { ref, inView } = useInView(); // 무한 스크롤을 위한 IntersectionObserver

  // props로 전달된 category 변경 감지
  useEffect(() => {
    console.log('SubListContainer: Category changed to:', category);
    setEffectiveCategory(category || '');
  }, [category]);

  // 무한 스크롤 처리
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log('SubListContainer: Loading next page...');
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 데이터 상태에 따른 UI 렌더링
  if (dataState === 'loading' || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (dataState === 'no_data' || dataState === 'filtered_no_data') {
    return (
      <div className={styles.emptyContainer}>
        <p>데이터가 없습니다.</p>
      </div>
    );
  }

  // 4위 이하 랭킹이 없는 경우
  if (!subListRankings || subListRankings.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>추가 랭킹 데이터가 없습니다.</p>
      </div>
    );
  }

  // 이미지 URL과 나이 제한 이미지를 포함한 랭킹 데이터 준비
  const enrichedRankings = subListRankings.map((item) => ({
    ...item,
    contentImg: getImageSrc(item.title, 'ranking'),
    ageImage: ageImage(item.age, 'shared'),
  }));

  return (
    <div className={styles.container}>
      <SubHeader
        imageTitle="4위 이하 콘텐츠 랭킹"
        imagePath={getImageSrc('4위 이하 콘텐츠 랭킹', 'ranking')}
        isImageRequired={true}
      />
      <div className={styles.rankingContainer}>
        {/* ImageSubList 컴포넌트에 content prop으로 전체 배열 전달 */}
        <ImageSubList content={enrichedRankings} />
      </div>
      {/* 무한 스크롤을 위한 관찰 요소 */}
      {hasNextPage && (
        <div ref={ref} className={styles.loadMoreTrigger}>
          {isFetchingNextPage && '로딩 중...'}
        </div>
      )}
    </div>
  );
};

export default RankingSubListContainer;
