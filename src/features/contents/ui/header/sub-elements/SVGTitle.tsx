import Image from 'next/image';
import imageMapping from '@/features/shared/utils/imageMapping';

type SVGTitleProps = {
  pageType: 'contentMain' | 'ranking' | 'recommended';
  imageTitle: string;
  isImageRequired: boolean;
};

const SVGTitle: React.FC<SVGTitleProps> = ({
  pageType,
  imageTitle,
  isImageRequired,
}) => {
  // Optional chaining을 사용하여 안전하게 이미지 경로 접근
  const imagePath = imageMapping[pageType]?.[imageTitle];

  // 이미지가 필수이고 이미지 경로가 없는 경우에만 에러 발생
  if (!imagePath && isImageRequired) {
    console.warn(`이미지를 찾을 수 없습니다: ${imageTitle} (${pageType})`);
    return <span>{imageTitle}</span>;
  }

  // 이미지 경로가 있으면 이미지를, 없으면 텍스트를 표시
  return imagePath ? (
    <Image
      src={imagePath}
      alt={imageTitle}
      width={0}
      height={0}
      style={{ width: 'auto', height: '15px' }}
    />
  ) : (
    <span>{imageTitle}</span>
  );
};

export default SVGTitle;
