import React from 'react';

import './title.css';

export interface TitleProps {
  size?: 'small' | 'medium' | 'large';
  label: string;
  font?: string;
}

export const Title = ({
  size = 'medium',
  label,
  font = 'sans-serif',
  ...props
}: TitleProps) => {
  return (
    <h1
    className={`title--${size}`}
    style={{ fontFamily: font}}
      {...props}
    >
      {label}
    </h1>
  );
};
