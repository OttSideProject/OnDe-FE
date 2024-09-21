import signup from '@/styles/user/signup';
import { Genre } from './constants';

interface SignupStep2Props {
  genres: Genre[];
  selectedIndexes: number[];
  handleSelect: (index: number) => void;
}

const SignupStep2 = ({
  genres,
  selectedIndexes,
  handleSelect,
}: SignupStep2Props) => (
  <signup.Container>
    <signup.Title2>어떤 문장을 선호하세요?</signup.Title2>
    <signup.Step2Container>
      {genres.map((genre, index) => (
        <signup.GenreStep2
          key={index}
          style={{
            background: selectedIndexes.includes(index)
              ? genre.color
              : 'transparent',
            cursor: 'pointer',
            color: selectedIndexes.includes(index) ? 'black' : 'white',
          }}
          onClick={() => handleSelect(index)}
        >
          {genre.sentence}
        </signup.GenreStep2>
      ))}
    </signup.Step2Container>
  </signup.Container>
);

export default SignupStep2;
