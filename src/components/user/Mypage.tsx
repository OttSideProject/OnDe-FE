// components/MyPage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface Genre {
  genreId: number;
  genreName: string;
}

interface UserProfile {
  name: string;
  avatar: string;
  favoriteGenres: Genre[];
}

interface MyPageProps {
  user: UserProfile;
  allGenres: Genre[];
  toggleFavoriteGenre: (genreId: number, genreName: string) => void;
}

const MyPage = ({ user, allGenres, toggleFavoriteGenre }: MyPageProps) => {
  const [favoriteGenres, setFavoriteGenres] = useState(user.favoriteGenres);

  const handleToggleGenre = (genreId: number, genreName: string) => {
    toggleFavoriteGenre(genreId, genreName);
    setFavoriteGenres((prevGenres) =>
      prevGenres.some((genre) => genre.genreId === genreId)
        ? prevGenres.filter((genre) => genre.genreId !== genreId)
        : [...prevGenres, { genreId, genreName }],
    );
  };

  return (
    <Container>
      <ProfileSection>
        <Avatar>
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={100}
            height={100}
          />
        </Avatar>
        <UserName>{user.name}</UserName>
      </ProfileSection>
      <GenreSection>
        <SectionTitle>좋아하는 장르</SectionTitle>
        <GenreList>
          {allGenres.map((genre) => (
            <GenreItem
              key={genre.genreId}
              selected={favoriteGenres.some((g) => g.genreId === genre.genreId)}
              onClick={() => handleToggleGenre(genre.genreId, genre.genreName)}
            >
              {genre.genreName}
            </GenreItem>
          ))}
        </GenreList>
      </GenreSection>
    </Container>
  );
};

export default MyPage;

// Styled Components
const Container = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const GenreSection = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const GenreItem = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${({ selected }) => (selected ? '#0070f3' : '#ccc')};
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? '#e0f4ff' : 'white')};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #0070f3;
  }
`;
