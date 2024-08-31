import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
// import { withDesign } from '@storybook-addon-designs';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  // decorators: [withDesign],
  args: { onClick: fn() },
} as Meta<typeof Button>;

export const Primary: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
    size: 'default',
    children: 'Button',
    onClick: () => {},
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: 'Button',
    onClick: () => {},
  },
};

export const SmallPrimary: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Button',
    onClick: () => {},
  },
};

export const SmallSecondary: StoryObj<typeof Button> = {
  args: {
    variant: 'secondary',
    size: 'small',
    children: 'Button',
    onClick: () => {},
  },
};

export const PrimaryActive: StoryObj<typeof Button> = {
  args: {
    variant: 'primary',
    size: 'default',
    isActive: true,
    children: 'Button',
  },
};

export const SecondaryActive: StoryObj<typeof Button> = {
  args: {
    variant: 'secondary',
    size: 'default',
    isActive: true,
    children: 'Button',
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/XyGzDLIoxOFptIzLQaQ2Hc/OnDe-%3A-SideProject-team-library-(Copy)?node-id=5715-10516&m=dev',
  },
};
