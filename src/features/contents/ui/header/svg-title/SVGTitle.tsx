import React from 'react';
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
  const imageUrl = imageMapping[pageType]?.[imageTitle];

  if (isImageRequired && !imageUrl) {
    throw new Error(
      `이미지가 필요한  ${pageType} ${imageTitle}에 이미지가 없습니다. `,
    );
  }

  return imageUrl ? <img src={imageUrl} alt={imageTitle} /> : null;
};

export default SVGTitle;
