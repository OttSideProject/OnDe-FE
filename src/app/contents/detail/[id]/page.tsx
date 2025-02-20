'use client';

import { useParams } from 'next/navigation';
import { UseCustomQuery } from '@/hooks/useCustomQuery';
import DetailComponent from '@/components/contents/detail/DetailComponent';
import DetailContents from '@/components/contents/detail/tabs/DetailContents';
import GoBack from '@/components/shared/go-back/GoBack';
import { fetchDetailData } from '@/api/fetchDetailData';

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
