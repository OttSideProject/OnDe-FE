import DetailPage from '@/components/contents/detail/DetailPage';

import { generateStaticParamsForIds } from '@/utils/generateStaticParams';

export async function generateStaticParams() {
  const ids = ['1', '2', '3', '4', '5']; // 실제 데이터로 대체 가능
  return generateStaticParamsForIds(ids);
}

const RecommendDetailPage: React.FC = () => {
  return <DetailPage queryKeyPrefix="recommend" />;
};

export default RecommendDetailPage;
