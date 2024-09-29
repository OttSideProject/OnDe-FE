import DetailComponent from '@/components/contents/detail/DetailComponent';
import DetailContents from '@/components/contents/detail/tabs/DetailContents';
import GoBack from '@/components/shared/go-back/GoBack';
import { generateStaticParamsForIds } from '@/utils/generateStaticParams';

export async function generateStaticParams() {
  const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']; // 실제 데이터로 대체 가능
  return generateStaticParamsForIds(ids);
}

const DetailPage = async ({ params }: { params: { id: string } })  => {
  return (
    <>
      <GoBack />
      <DetailComponent id={params.id} />
      <DetailContents />
    </>
  );
};

export default DetailPage;
