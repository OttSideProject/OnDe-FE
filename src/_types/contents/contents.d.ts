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
  isLoginRequired?: boolean; // 로그인 필요 여부
  isVisible?: boolean; // 현재 로그인 상태에 따른 표시 여부
};

export type RankingMainSliderProps = {
  slides: Slide[];
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
// 엔티티 타입
export type DetailData = {
  contentId: string;
  title: string;
  summary: string;
  genres: string[];
  age: string;
  ctype: string;
  released: string;
  imageUrl?: string;
};

// Ranking Data type

export type Ranking = {
  id: number; // id 타입을 number로 변경
  content_id: string;
  content_img?: string;
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
