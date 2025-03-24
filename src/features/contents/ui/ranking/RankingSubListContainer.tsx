import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/* Types */
import { Ranking, RankingsResponse } from '@/shared/types/contents';

/* Utils */
import { ageImage } from '@/shared/utils/ageImage';

import { useRankingData } from '@/entities/contents/hooks/useRankingData';

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
  const [effectiveCategory, setEffectiveCategory] = useState<string>(category || '');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useRankingData(effectiveCategory);
  const [rankings, setRankings] = useState<Ranking[]>([]); // 한 번에 로드된 랭킹 데이터
  const { ref, inView } = useInView(); // 무한 스크롤을 위한 IntersectionObserver

  // props로 전달된 category 변경 감지
  useEffect(() => {
    console.log('Category changed to:', category);
    setEffectiveCategory(category || '');
    // category가 변경되면 rankings 초기화
    setRankings([]);
    // 카테고리가 변경되면 데이터 다시 불러오기
    refetch();
  }, [category, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 페이지 데이터를 추적하여 중복을 방지
  useEffect(() => {
    console.log('Data changed:', data);
    if (data?.pages && data.pages.length > 0) {
      // 타입 안전하게 데이터 추출
      const updatedRankings: Ranking[] = [];
      
      data.pages.forEach((page: RankingsResponse) => {
        if (page && page.content && Array.isArray(page.content)) {
          updatedRankings.push(...page.content);
        }
      });

      console.log('Updated rankings:', updatedRankings.length);

      if (updatedRankings.length === 0) {
        console.log('No rankings found');
        setRankings([]);
        return;
      }

      // 상위 3개 항목 제외 (RankingMainContainer에서 표시됨)
      const subListRankings = updatedRankings.slice(3, 48); // 3번 인덱스(4위)부터 시작
      
      // 4위부터 데이터가 없는 경우 빈 배열 설정
      if (subListRankings.length === 0) {
        console.log('No rankings from 4th position');
        setRankings([]);
        return;
      }
      
      // 순위를 4부터 시작하도록 설정
      const adjustedRankings = subListRankings.map((ranking, index) => ({
        ...ranking,
        rank: index + 4, // 순위가 4부터 시작 (인덱스 0이 4위)
        ageImage: ranking.age
          ? ageImage(String(ranking.age), 'shared')
          : null, // age 속성명 변경
      }));

      console.log('Adjusted rankings:', adjustedRankings.length);

      setRankings(adjustedRankings);
    } else {
      // 데이터가 없는 경우 빈 배열 설정
      setRankings([]);
    }
  }, [data]);

  // 현재 적용된 필터를 표시하기 위한 제목 생성
  const getFilterTitle = () => {
    if (!effectiveCategory) return "지금 가장 HOT한 콘텐츠";
    
    const filters = effectiveCategory.split(',');
    if (filters.length <= 2) {
      return `${filters.join(', ')} 콘텐츠`;
    } else {
      return `${filters[0]}, ${filters[1]} 외 ${filters.length - 2}개 필터 적용`;
    }
  };

  // 빈 데이터 메시지 렌더링
  const renderEmptyMessage = () => {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyMessage}>4위부터 48위까지 현재 이용 가능한 콘텐츠가 없습니다.</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <SubHeader 
        imageTitle={getFilterTitle()}
        imagePath={getImageSrc('지금 가장 HOT한 콘텐츠', 'ranking')}
        isImageRequired={true}
      />
      {rankings.length === 0 ? (
        renderEmptyMessage()
      ) : (
        <ImageSubList
          content={rankings}
        />
      )}
      {hasNextPage && rankings.length > 0 && (
        <div ref={ref} className={styles.loadingIndicator}>
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </div>
      )}
    </div>
  );
};

export default RankingSubListContainer;
