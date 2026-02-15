'use client';

import { forwardRef } from 'react';
import { ButtonBase, type ButtonBaseProps } from './Button';

export const GlassButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props, ref) => {
    return <ButtonBase ref={ref} variant="glass" {...props} />;
  }
);

GlassButton.displayName = 'GlassButton';
