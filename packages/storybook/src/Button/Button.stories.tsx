import React from 'react';
import { Button } from './Button';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
} as Meta;

export const Main: Story = () => <Button backgroundColor="black" primary size="medium" label="Button" />;
