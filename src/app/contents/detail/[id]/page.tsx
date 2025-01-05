import DetailComponent from '@/components/contents/detail/DetailComponent';
import DetailContents from '@/components/contents/detail/tabs/DetailContents';
import GoBack from '@/components/shared/go-back/GoBack';

const DetailPage: React.FC = () => {
  return (
    <>
		{/* 12월 29일 aws 배포 테스트 */}
      <GoBack />
      <DetailComponent />
      <DetailContents />
    </>
  );
};

export default DetailPage;
