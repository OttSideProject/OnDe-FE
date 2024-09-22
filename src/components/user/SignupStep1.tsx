// components/SignupStep1.tsx
import Image from 'next/image';
import signup from '@/styles/user/signup';
import { SvgGenre } from '../../app/users/signup/constants';
import { useState } from 'react';

interface SignupStep1Props {
  genres: SvgGenre[];
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
}

const SignupStep1 = ({
  genres,
  selectedGenres,
  toggleGenre,
}: SignupStep1Props) => {
  const [svgGenres, setSvgGenres] = useState(genres);

  // 클릭 시 이미지 경로를 토글하는 함수
  const handleToggleGenre = (genre: string) => {
    toggleGenre(genre);
    setSvgGenres((prevGenres) =>
      prevGenres.map((item) =>
        item.genre === genre
          ? {
              ...item,
              file: item.file.includes('join_release')
                ? `/assets/images/join_press/genre-${genre}.png` // 'join_press' 경로로 변경
                : `/assets/images/join_release/genre-${genre}.png`, // 다시 'join_release' 경로로 변경
            }
          : item,
      ),
    );
  };

  return (
    <signup.Container
      style={{ position: 'relative', width: '100%', height: '500px' }}
    >
      <signup.Title2>
        안녕하세요! <br /> 어떤 장르를 선호하세요?
      </signup.Title2>
      {svgGenres.map((item, index) => (
        <signup.ImageContainer
          key={index}
          style={{ position: 'absolute', top: item.top, left: item.left }}
        >
          <signup.ImagesIcon onClick={() => handleToggleGenre(item.genre)}>
            <Image
              src={item.file}
              alt={item.genre}
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
          </signup.ImagesIcon>
        </signup.ImageContainer>
      ))}
    </signup.Container>
  );
};

export default SignupStep1;
