'use client';

import { useParams } from 'next/navigation';
import { DetailData } from '@/shared/types/contents';
import { UseCustomQuery } from '@/shared/lib/hooks';
import { fetchDetailData } from '@/entities/contents/main';
import { DetailComponent } from '@/features/contents/ui/detail';
import { DetailContents } from '@/features/contents/ui/detail/tabs';
import { GoBack } from '@/shared/ui/go-back';

const DetailPage = () => {
  const { id } = useParams();
  const contentId = Array.isArray(id) ? id[0] : id;

  const { data, error, isLoading } = UseCustomQuery<DetailData>(
    ['detail', contentId],
    () => fetchDetailData(contentId),
    {
      queryKey: ['detail', contentId],
      enabled: !!contentId,
    },
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>콘텐츠 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>콘텐츠 정보를 불러오는데 실패했습니다.</p>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="error-container">
        <p>콘텐츠를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <main>
      <GoBack />
      <DetailComponent detailData={data} />
      <DetailContents id={contentId} detailData={data} />
    </main>
  );
};

export default DetailPage;
