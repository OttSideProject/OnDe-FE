import 'styled-components';
import { TColorsTypes, TFontsTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: TColorsTypes;
    fonts: TFontsTypes;
  }
}
