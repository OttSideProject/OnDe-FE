'use client';

import '@emotion/react';
import { TColorsTypes, TFontsTypes } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: TColorsTypes;
    fonts: TFontsTypes;
  }
}
