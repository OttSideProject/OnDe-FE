import React from 'react';
import imageMapping from '@/utils/imageMapping';

type SVGTitleProps = {
  pageType: 'contentMain' | 'ranking' | 'recommended';
  imageTitle: string;
};

const SVGTitle: React.FC<SVGTitleProps> = ({ pageType, imageTitle }) => {
  const imageUrl = imageMapping[pageType]?.[imageTitle] || '';
  return imageUrl ? <img src={imageUrl} alt={imageTitle} /> : null;
};

export default SVGTitle;