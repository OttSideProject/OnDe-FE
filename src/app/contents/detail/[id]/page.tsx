import DetailComponent from '@/components/contents/detail/DetailComponent';
import DetailContents from '@/components/contents/detail/tabs/DetailContents';
import GoBack from '@/components/shared/go-back/GoBack';

const DetailPage: React.FC = () => {
  return (
    <main>
      <GoBack />
      <DetailComponent />
      <DetailContents />
    </main>
  );
};

export default DetailPage;
