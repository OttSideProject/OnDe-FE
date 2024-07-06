'use client';

import type { Theme } from '@emotion/react';

const colors = {
  //
};

export const fonts = {
  //
};

export type TColorsTypes = typeof colors;
export type TFontsTypes = typeof fonts;

const Theme = {
  colors,
  fonts,
};

export default Theme as Theme & { colors: TColorsTypes; fonts: TFontsTypes };
