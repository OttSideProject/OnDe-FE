/* MainSlider type */
export type Slide = {
  id: number;
  url: string;
	age?: string;
  title: string;
  subTitle: string[];
};

export type MainSliderProps = {
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
  id: number;
  name: string;
  profileImg?: string;
  imgUrl?: string;
  detailUrl: string;
  title: string;
  description: string;
  likeCount?: number;
  messageCount?: number;
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
  id: number;
  age: string;
  title: string;
  subTitle?: string[];
  ranking_num: number;
  content_id: number;
  content_img: string;
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
