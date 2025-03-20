export interface SvgGenre {
  file: string;
  id: number;
  genre: string;
  top?: string;
  left?: string;
}

export const initialGenres: SvgGenre[] = [
  {
    file: '/assets/images/join_release/genre-science.png',
    id: 1,
    genre: 'science',
    top: '-1%',
    left: '-4%',
  },
  {
    file: '/assets/images/join_release/genre-drama.png',
    id: 2,
    genre: 'drama',
    top: '-2%',
    left: '30%',
  },
  {
    file: '/assets/images/join_release/genre-romance.png',
    id: 3,
    genre: 'romance',
    top: '0%',
    left: '66%',
  },
  {
    file: '/assets/images/join_release/genre-ani.png',
    id: 4,
    genre: 'ani',
    top: '22%',
    left: '14%',
  },
  {
    file: '/assets/images/join_release/genre-fantasy.png',
    id: 5,
    genre: 'fantasy',
    top: '23%',
    left: '49%',
  },
  {
    file: '/assets/images/join_release/genre-comedy.png',
    id: 6,
    genre: 'comedy',
    top: '43%',
    left: '-4%',
  },
  {
    file: '/assets/images/join_release/genre-hero.png',
    id: 7,
    genre: 'hero',
    top: '46%',
    left: '61%',
  },
  {
    file: '/assets/images/join_release/genre-action.png',
    id: 8,
    genre: 'action',
    top: '43%',
    left: '30%',
  },
  {
    file: '/assets/images/join_release/genre-thriller.png',
    id: 9,
    genre: 'thriller',
    top: '67%',
    left: '11%',
  },
  {
    file: '/assets/images/join_release/genre-enter.png',
    id: 10,
    genre: 'enter',
    top: '67%',
    left: '43%',
  },
  {
    file: '/assets/images/join_release/genre-documentary.png',
    id: 11,
    genre: 'documentary',
    top: '70%',
    left: '73%',
  },
];

export interface Genre {
  sentence: string;
  color: string;
  border: string;
}

export const genres_setp2: Genre[] = [
  {
    sentence: '반전의 연속 충격적인 서스펜스',
    color: 'rgba(180, 51, 251, 0.50)',
    border: '#B433FB',
  },
  {
    sentence: '싸늘해 내가 다 추워지는 공포',
    color: 'rgba(94, 134, 243, 0.50)',
    border: '#5E86F3',
  },
  {
    sentence: '함께보면 더 따뜻한 가족이야기',
    color: 'rgba(244, 254, 11, 0.50)',
    border: '#F4FE0B',
  },
  {
    sentence: '두근두근 설렘 가득 로맨스',
    color: 'rgba(255, 194, 194, 0.50)',
    border: '#FFC2C2',
  },
  {
    sentence: '주인공 버프 가득한 히어로물',
    color: 'rgba(251, 82, 194, 0.50)',
    border: '#FB52C2',
  },
  {
    sentence: '너도? 나도, 공감백배 관찰예능',
    color: 'rgba(251, 185, 32, 0.50)',
    border: '#FBB920',
  },
  {
    sentence: '현실탈출 꿈같은 판타지 세계',
    color: 'rgba(22, 251, 197, 0.50)',
    border: '#16FBC5',
  },
  {
    sentence: '힐링이 필요해 잔잔한 힐링영화',
    color: 'rgba(22, 251, 245, 0.50)',
    border: '#16FBF5',
  },
];

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
  genres: string[];
  sentence: string[];
}
