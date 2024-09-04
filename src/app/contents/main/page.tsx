import MainSlider, { Slide } from '@/components/contents/MainSlider';
import Header from '@/components/contents/header/Header';
import styles from './page.module.css';
import SectionSlider, {
  SectionSlide,
} from '@/components/contents/SectionSlider';
import SubHeader from '@/components/contents/header/SubHeader';

const headerText = '오늘의 Dimi Pick';

const userName = '디미';

const slides: Slide[] = [
  {
    id: 1,
    title: '더 인플루언서',
    subTitle: ['흥미진진한', '시리즈', '서바이벌'],
    url: 'https://picsum.photos/240/360?random=1',
  },
  {
    id: 2,
    title: '에일리언',
    subTitle: ['독특한', '서스펜스', 'SF'],
    url: 'https://picsum.photos/240/360?random=2',
  },
  {
    id: 3,
    title: '귀공자',
    subTitle: ['독특한', '서스펜스', 'SF'],
    url: 'https://picsum.photos/240/360?random=3',
  },
  {
    id: 4,
    title: 'title 4',
    subTitle: ['흥미진진한', '시리즈', '서바이벌'],
    url: 'https://picsum.photos/240/360?random=4',
  },
  {
    id: 5,
    title: 'title 5',
    subTitle: ['흥미진진한', '시리즈', '서바이벌'],
    url: 'https://picsum.photos/240/360?random=5',
  },
];

export type Section = {
  id: number;
  title: string;
  linkText: string;
  sectionSlides: SectionSlide[];
};

const sections: Section[] = [
  {
    id: 1,
    title: '님이 즐겨찾는 콘텐츠',
    linkText: '모아보기 더보기',
    sectionSlides: [
      {
        id: 1,
        url: 'https://picsum.photos/104/156?random=1',
      },
      {
        id: 2,
        url: 'https://picsum.photos/104/156?random=2',
      },
      {
        id: 3,
        url: '',
      },
      {
        id: 4,
        url: '',
      },
      {
        id: 5,
        url: '',
      },
    ],
  },
  {
    id: 2,
    title: '소년만화 좋아하시죠?',
    linkText: '추천 더보기',
    sectionSlides: [
      {
        id: 1,
        url: 'https://picsum.photos/104/156?random=1',
      },
      {
        id: 2,
        url: 'https://picsum.photos/104/156?random=2',
      },
      {
        id: 3,
        url: 'https://picsum.photos/104/156?random=3',
      },
      {
        id: 4,
        url: 'https://picsum.photos/104/156?random=4',
      },
      {
        id: 5,
        url: 'https://picsum.photos/104/156?random=5',
      },
    ],
  },
  {
    id: 3,
    title: 'NEW! 따끈따끈한 신작',
    linkText: '신작 더보기',
    sectionSlides: [
      {
        id: 1,
        url: 'https://picsum.photos/104/156?random=1',
      },
      {
        id: 2,
        url: 'https://picsum.photos/104/156?random=2',
      },
      {
        id: 3,
        url: 'https://picsum.photos/104/156?random=3',
      },
      {
        id: 4,
        url: 'https://picsum.photos/104/156?random=4',
      },
      {
        id: 5,
        url: 'https://picsum.photos/104/156?random=5',
      },
    ],
  },
  {
    id: 4,
    title: '지금 가장 인기있는 시리즈',
    linkText: '드라마 랭킹 더보기',
    sectionSlides: [
      {
        id: 1,
        url: 'https://picsum.photos/104/156?random=1',
      },
      {
        id: 2,
        url: 'https://picsum.photos/104/156?random=2',
      },
      {
        id: 3,
        url: 'https://picsum.photos/104/156?random=3',
      },
      {
        id: 4,
        url: 'https://picsum.photos/104/156?random=4',
      },
      {
        id: 5,
        url: 'https://picsum.photos/104/156?random=5',
      },
    ],
  },
  {
    id: 5,
    title: '지금 가장 인기있는 영화',
    linkText: '영화 랭킹 더보기',
    sectionSlides: [
      {
        id: 1,
        url: 'https://picsum.photos/104/156?random=1',
      },
      {
        id: 2,
        url: 'https://picsum.photos/104/156?random=2',
      },
      {
        id: 3,
        url: 'https://picsum.photos/104/156?random=3',
      },
      {
        id: 4,
        url: 'https://picsum.photos/104/156?random=4',
      },
      {
        id: 5,
        url: 'https://picsum.photos/104/156?random=5',
      },
    ],
  },
];

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header headerText={headerText} />
      <MainSlider slides={slides} />
      {sections.map((section) => (
        <div key={section.id}>
          {/* 첫 번째 섹션일 때 사용자 이름을 추가 */}
          <SubHeader
            title={
              section.id === 1 ? `${userName}${section.title}` : section.title
            }
            linkText={section.linkText}
          />
          <SectionSlider sectionSlides={section.sectionSlides} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
