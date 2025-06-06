import type { Meta, StoryObj } from '@storybook/react';

import { Title } from './Title';

const meta = {
  component: Title,
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label",
    font: ""
  }
};