// app/border/details/[id]/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

const DetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('idx'); // URL에서 'id' 파라미터 추출

  // console.log('dddd');
  return (
    <div>
      <h1>Details of Border with ID: {id}</h1>
    </div>
  );
};

export default DetailPage;
