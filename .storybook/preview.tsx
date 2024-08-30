import type { Preview } from '@storybook/react';
import React from 'react';
import { pretendardBold } from '../src/app/layout'; /* 폰트 적용 */
import '../src/styles/core/globals.css'; /* 글로벌 스타일 적용 */

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <div className={pretendardBold.variable}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
