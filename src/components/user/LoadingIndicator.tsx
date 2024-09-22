// components/LoadingIndicator.tsx
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LoadingIndicator = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/assets/images/icons/dimi-eyes-off.svg',
    '/assets/images/icons/dimi-eyes-on.svg',
    '/assets/images/icons/dimi-lime.svg',
    '/assets/images/icons/dimi-purple.svg',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '40px',
      }}
    >
      <Image src={images[currentImage]} alt="로딩 중" width={40} height={40} />
    </div>
  );
};

export default LoadingIndicator;
