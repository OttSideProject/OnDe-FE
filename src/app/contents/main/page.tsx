/* Components */
import Header from '@/components/contents/header/Header';
import MainSlider from '@/components/contents/MainSlider';
import SectionSliderContainer from '@/components/contents/SectionSliderContainer';

/* Types */
import { Slide } from '@/_types/contents/contents';

/* Styles */
import styles from './page.module.css';

const headerText = '오늘의 Dimi pick';

const iconUrl = '/assets/images/icons/dimi-lime.svg';

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


const HomePage: React.FC = () => {
	
  return (
    <div className={styles.container}>
      <Header headerText={headerText} iconUrl={iconUrl} />
      <MainSlider slides={slides} />
			<SectionSliderContainer />
    </div>
  );
};

export default HomePage;
