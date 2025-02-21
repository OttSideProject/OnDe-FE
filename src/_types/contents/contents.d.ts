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
  contentImg: string | null;
  genres: string[];
  rank: number;
};

export type RankingMainSliderProps = MainSliderProps; // RankingMainSliderProps 타입 추가

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
  imgUrl: string;
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
  id: string;
  title: string;
  info: InfoItem[];
  description: string;
  imageUrl: string;
};

export type InfoItem = string | { type: 'image'; src: string; alt: string };

// Ranking Data type

export type Ranking = {
  id: number; // id 타입을 number로 변경
  content_id: string;
  content_img: string;
  title: string;
  subTitle?: string[];
  ranking_num: number;
  age: string;
  category: 'shared'; // category 속성 추가
};

export type RankingsResponse = {
  pageNo: number;
  totalPages: number;
  totalItems: number;
  rankings: Ranking[];
};

// RankingSubListContainer type
export type RankingSubListContainerProps = {
  rankings: Ranking[];
};

//RecommendedSlider Type
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
  imgUrl: string;
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
