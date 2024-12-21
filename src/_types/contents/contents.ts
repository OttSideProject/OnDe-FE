/* Header type */
export type HeaderProps = {
  headerText: string;
  iconUrl: string;
};

/* MainSlider type */
export type Slide = {
  id: number;
  url: string;
  title: string;
  subTitle: string[];
};

export type MainSliderProps = {
  slides: Slide[];
};

/* SubHeader type */
export type SubHeaderProps = {
  title: string;
  linkText?: string;
  linkUrl?: string;
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

/* IconButton type */
export type InfoIconButtonProps = {
  onClick: () => void;
};

/* ToggleIconButton Store type */
export type ToggleActionStore = {
  isActive: boolean;
  toggleClick: () => void;
};

export type MoreOptionsIconButtonProps = {
  onClick: () => void;
};

/* DimmedBackground type */
export type DimmedBackgroundProps = {
  onClick: () => void;
};

/* DropDown Store type */
export type DropDownStore = {
  isDropDownOpen: boolean;
  openDropDown: () => void;
  closeDropDown: () => void;
};

/* DropDownOptionsProps type */
export type Option = {
  id: number;
  label?: string;
  link?: string;
  url?: string;
};

export type DropDownOptionsProps = {
  title?: string;
  height?: number;
  options: Option[];
  onSelect?: (id: number) => void;
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

/* DetailPage Tab type */

/* Tab props type */
export type Category = {
  label: string | JSX.Element;
  key: string;
};

export type TabProps = {
  categories: Category[]; // 카테고리 목록
  renderContent: (selectedCategory: string) => JSX.Element; // 선택된 카테고리에 따른 렌더링 함수
};

/* DetailPage Tab styles type */
export type CategoryTitleStyleProps = {
  selectedCategory: string;
  category: string;
  onClick: () => void;
};

/* ViemMoreButton toggle type*/
export type ViewMoreButtonProps = {
  content: string;
  viewIcon?: string;
};

/* GoBack type */
export type GoBackProps = {
  isOpen?: boolean;
  onClick?: () => void;
  isClose?: boolean;
};
