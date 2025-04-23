import React from 'react';

import './title.css';

export interface SubtitleProps {
  size?: 'small' | 'medium' | 'large';
  label: string;
  font?: string;
}

/** Primary UI component for user interaction */
export const Subtitle = ({
  size = 'small',
  label,
  font = 'sans-serif',
  ...props
}: SubtitleProps) => {
  return (
    <h1
    className='subtitle'
    style={{ fontFamily: font}}
      {...props}
    >
      {label}
    </h1>
  );
};
