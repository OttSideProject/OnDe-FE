/* MainSlider type */
export type Slide = {
  id: number;
  url: string;
  age?: string;
  category?: 'shared';
  title: string;
  subTitle: string[];
};

export type TodayPickContent = {
  contentId: string;
  title: string;
  age: string;
  contentImg?: string;
  genres: string[];
  rank: number;
};


/* SectionSlider type */
export type Section = {
  id: number;
  title: string;
  linkText: string;
  linkUrl: string;
  sectionSlides: SectionSlide[];
};

export type SectionSliderProps = {
  sectionSlides: SectionSlide[];
  showActionBar?: boolean;
};

export type SectionSlide = {
  id: number;
  imgUrl?: string;
  detailUrl: string;
};

export type SectionsResponse = {
  pageNo: number;
  totalPages: number;
  totalItems: number;
  sections: Section[];
};

/* BoardSectionSlider type */
export type BoardSectionSlide = {
  boardId: number;
  postIdx: number;
  userIdx: number;
  name: string;
  profileImg?: string;
  imgUrl?: string;
  detailUrl?: string;
  title: string;
  contents: string;
  postViews: number;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
};

export type BoardSectionStore = {
  boardSections: BoardSectionSlide[];
  isLoading: boolean;
  error: string | null;
  fetchBoardSections: () => Promise<void>;
};

/* ToggleIconButton Store type */
export type ToggleActionStore = {
  isActive: boolean;
  toggleClick: () => void;
};

/* DropDown Store type */
export type DropDownStore = {
  isDropDownOpen: boolean;
  openDropDown: () => void;
  closeDropDown: () => void;
};

/* DetailPage type */
export type DetailData = {
  contentId: string;
  title: string;
  summary: string;
  genres: string[];
  age: string;
  ctype: string;
  released: string;
  imageUrl?: string;
  actors?: string[];
  director?: string;
  runningTime?: string;
};

export type OttPlatform = {
  platform: string;
  content_link: string;
};

/* Ranking Data type */

// export type RankingMainSliderProps = {
//   slides: Slide[];
// };

export type Ranking = {
  rank: number;
  contentId: string;
  contentImg?: string;
  imgUrl?: string;
  genres: string[];
  title: string;
  age: string;
  ageImage: string | null;
  category: 'shared';
};

export type RankingsResponse = {
  content: Ranking[]; // content 배열
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

export type RankingSubListContainerProps = {
  rankings: Ranking[];
};

export type RecommendedSection = {
  id: number;
  title: string;
  linkText: string;
  linkUrl: string;
  sectionSlides: SectionSlide[];
};

export type RecommendedSliderProps = {
  recommendedSlides: RecommendedSlide[];
};

export type RecommendedSlide = {
  id: number;
  imgUrl?: string;
  detailUrl: string;
};

export type RecommendedSectionSliderProps = {
  recommendedSlides: RecommendedSectionSlide[];
};

export type RecommendedSectionSlide = {
  id: number;
  imgUrl?: string;
};

export type RecommendedResponse = {
  pageNo: number;
  totalPages: number;
  totalItems: number;
  sections: Section[];
};

export type RecommendedMainSlide = {
  id: number;
  imgUrl?: string;
};

/* Category types */
export type ContentCategory =
  | 'action'
  | 'comedy'
  | 'horror'
  | 'drama'
  | 'romance'
  | 'youth'
  | 'fantasy'
  | 'sf'
  | 'musical'
  | 'thriller'
  | 'crime'
  | 'animation'
  | 'documentary'
  | 'reality';

export type CategoryContent = {
  contentId: string;
  title: string;
  age: string;
  contentImg?: string;
  genres: string[];
  summary?: string;
};

export type CategoryResponse = {
  pageNo: number;
  totalPages: number;
  totalItems: number;
  contents: CategoryContent[];
};

/* Filter Types */
export type FilterItem = {
  id: string;
  label: string;
  selected?: boolean;
};

export type FilterGroup = {
  id: string;
  label: string;
  icon?: string;
  items: FilterItem[];
  isExpanded?: boolean;
};
