/* Header type */
export type HeaderProps = {
  headerText: string;
  iconUrl: string;
};

/* Button type */
export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'default';
  width?: number;
  height?: number;
  text?: string;
  iconUrl?: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
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
  linkText: string;
  linkUrl: string;
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

/* IconButton type */
export type InfoIconButtonProps = {
  onClick: () => void;
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

export type TabProps = {
  categories: { [key: string]: string }; // key-value 형태의 카테고리
  renderContent: (category: string) => JSX.Element; // 선택된 카테고리에 따른 렌더링 함수
};

/* DetailPage Tab styles type */
export type CategoryTitleStyleProps = {
  selectedCategory: string;
  onClick: () => void;
};

/* ViemMoreButton toggle type*/
export type ViewMoreButtonProps = {
  content: string;
  viewIcon?: string;
};
