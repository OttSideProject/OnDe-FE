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

/* Order type */
export type OrderContent = {
  // userName: string;
  contentId: string;
  title: string;
  age: string;
  ageImage: string | null;
  contentImg?: string;
  imgUrl?: string;
  genres: string[];
  rank: number;
  category: 'shared';
};

export type OrderResponse = {
  data: {
    content: OrderContent[];
    page: {
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    };
  };
  content: OrderContent[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

/* BoardSectionSlider type */
export type BoardSectionSlide = {
  boardId: number;
  postIdx: number;
  userIdx: number;
  name: string;
  profileImg?: string;
  imgUrl?: string;
  contentImg?: string;
  detailUrl?: string;
  title: string;
  contents: string;
  postViews: number;
  likeCount: number;
  commentCount: number;
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
  runtime?: string;
};

export type OttPlatform = {
  platform: string;
  content_link: string;
};

/* Ranking Data type */

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
  contentImg?: string;
  detailUrl: string;
};

export type RecommendedSectionSliderProps = {
  recommendedSlides: RecommendedSectionSlide[];
};

export type RecommendedSectionSlide = {
  id: number;
  imgUrl?: string;
  contentImg?: string;
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
  contentImg?: string;
};

/* Filter Types */
export type GenreItem = {
  id: string;
  label: string;
};

export type FilterItem = {
  id: string;
  label: string;
  selected?: boolean;
};

export type GenreListResponse = {
  genreId: number;
  genre: string;
}[];

export type FilterGroup = {
  id: string;
  label: string;
  icon?: string;
  items: FilterItem[];
  isExpanded?: boolean;
};

/* Contents Types */
export type ContentType = {
  rank: number;
  contentId: string;
  contentImg?: string;
  imgUrl?: string;
  genres: string[];
  title: string;
  age: string;
  ageImage: string | null;
  category: 'shared';
  type: 'movie' | 'drama' | 'enter' | 'docu' | 'ani' | 'new';
};

export type ContentTypeResponse = {
  content: ContentType[]; // content 배열
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

export type ContentTypeProps = {
  types: ContentType[];
};

/* Contents Search */
export type SearchContent = {
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

export type SearchContentResponse = {
  content: SearchContent[]; // content 배열
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

export type SearchContentProps = {
  search: SearchContent[];
};

/* Image Mapping */
export type PageType = 'contentMain' | 'ranking' | 'recommended' | 'type' | '';
