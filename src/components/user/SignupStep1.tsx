// components/SignupStep1.tsx
import Image from 'next/image';
import signup from '@/styles/user/signup';
import { SvgGenre } from '../../app/users/signup/constants';
import { useState } from 'react';

interface SelectedGenre {
  genreId: number;
  genreName: string;
}

interface SignupStep1Props {
  genres: SvgGenre[];
  selectedGenres: { genreId: number; genreName: string }[];
  toggleGenre: (genreId: number, genreName: string) => void;
}

const SignupStep1 = ({
  genres,
  selectedGenres,
  toggleGenre,
}: SignupStep1Props) => {
  const [svgGenres, setSvgGenres] = useState(genres);

  const handleToggleGenre = (genreId: number, genreName: string) => {
    toggleGenre(genreId, genreName);
    setSvgGenres((prevGenres) =>
      prevGenres.map((item) =>
        item.id === genreId
          ? {
              ...item,
              file: item.file.includes('join_release')
                ? `/assets/images/join_press/genre-${genreName}.png`
                : `/assets/images/join_release/genre-${genreName}.png`,
            }
          : item,
      ),
    );
  };

  return (
    <signup.Container
      style={{ position: 'relative', width: '100%', height: '135vw' }}
    >
      <signup.Title2>
        안녕하세요! <br /> 어떤 장르를 선호하세요?
      </signup.Title2>
      {svgGenres.map((item, index) => (
        <signup.ImageContainer
          key={index}
          style={{ position: 'absolute', top: item.top, left: item.left }}
        >
          <signup.ImagesIcon
            onClick={() => handleToggleGenre(item.id, item.genre)}
          >
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
