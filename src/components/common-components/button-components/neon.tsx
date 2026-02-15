'use client';

import { forwardRef } from 'react';
import { ButtonBase, type ButtonBaseProps } from './button';

export const NeonButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props, ref) => {
    return <ButtonBase ref={ref} variant="neon" {...props} />;
  }
);

NeonButton.displayName = 'NeonButton';
