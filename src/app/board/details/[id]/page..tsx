import { useRouter } from 'next/navigation';

const BoardDetail = ({ params }: { params: { idx: any } }) => {
  const { idx } = params;

  return (
    <div>
      <h1>Board Detail for Post {idx}</h1>
      {/* 해당 idx에 대한 상세yarn 정보 렌더링 */}
    </div>
  );
};

export default BoardDetail;
