export interface SvgGenre {
  file: string;
  id: number;
  genre: string;
  top: string;
  left: string;
}

export const initialGenres: SvgGenre[] = [
  {
    file: '/assets/images/join_release/genre-science.png',
    id: 1,
    genre: 'science',
    top: '20%',
    left: '5%',
  },
  {
    file: '/assets/images/join_release/genre-drama.png',
    id: 2,
    genre: 'drama',
    top: '20%',
    left: '43%',
  },
  {
    file: '/assets/images/join_release/genre-romance.png',
    id: 3,
    genre: 'romance',
    top: '25%',
    left: '70%',
  },
  {
    file: '/assets/images/join_release/genre-ani.png',
    id: 4,
    genre: 'ani',
    top: '35%',
    left: '20%',
  },
  {
    file: '/assets/images/join_release/genre-fantasy.png',
    id: 5,
    genre: 'fantasy',
    top: '38%',
    left: '50%',
  },
  {
    file: '/assets/images/join_release/genre-comedy.png',
    id: 6,
    genre: 'comedy',
    top: '50%',
    left: '5%',
  },
  {
    file: '/assets/images/join_release/genre-hero.png',
    id: 7,
    genre: 'hero',
    top: '50%',
    left: '33%',
  },
  {
    file: '/assets/images/join_release/genre-action.png',
    id: 8,
    genre: 'action',
    top: '50%',
    left: '65%',
  },
  {
    file: '/assets/images/join_release/genre-thriller.png',
    id: 9,
    genre: 'thriller',
    top: '68%',
    left: '16%',
  },
  {
    file: '/assets/images/join_release/genre-enter.png',
    id: 10,
    genre: 'enter',
    top: '68%',
    left: '45%',
  },
  {
    file: '/assets/images/join_release/genre-documentary.png',
    id: 11,
    genre: 'documentary',
    top: '68%',
    left: '70%',
  },
];

export interface Genre {
  sentence: string;
  color: string;
}

export const genres_setp2: Genre[] = [
  { sentence: '반전의 연속 충격적인 서스펜스', color: '#B433FB' },
  { sentence: '싸늘해 내가 다 추워지는 공포', color: '#5E86F3' },
  { sentence: '함께보면 더 따뜻한 가족이야기', color: '#FBB920' },
  { sentence: '두근두근 설렘 가득 로맨스', color: '#FFC2C2' },
  { sentence: '주인공 버프 가득한 히어로물', color: '#FB52C2' },
  { sentence: '너도? 나도, 공감백배 관찰예능', color: '#BAFB16' },
  { sentence: '현실탈출 꿈같은 판타지 세계', color: '#16FBC5' },
  { sentence: '힐링이 필요해 잔잔한 힐링영화', color: '#16FBF5' },
];

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
  genres: string[];
  sentence: string;
}
