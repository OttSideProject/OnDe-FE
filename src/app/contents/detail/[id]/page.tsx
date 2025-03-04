'use client';

import { useParams } from 'next/navigation';
import { UseCustomQuery } from '@/features/shared/lib/hooks';
import { DetailComponent } from '@/features/contents/ui/detail';
import { DetailContents } from '@/features/contents/ui/detail/tabs';
import { GoBack } from '@/features/shared/ui/go-back';
import { fetchDetailData } from '@/entities/contents/main';

const DetailPage: React.FC = () => {
  const { id } = useParams();
  const detailId = Number(id);

  const { data, error, isLoading } = UseCustomQuery(
    [detailId], // queryKey
    () => fetchDetailData(String(detailId)), // queryCallBack
    { queryKey: [detailId] },
  );

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <main>
      <GoBack />
      <DetailComponent detailData={data} />
      <DetailContents id={detailId} />
    </main>
  );
};

export default DetailPage;
