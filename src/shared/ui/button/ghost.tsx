'use client';

import { forwardRef } from 'react';
import { ButtonBase, type ButtonBaseProps } from './button';

export const GhostButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props, ref) => {
    return <ButtonBase ref={ref} variant="ghost" {...props} />;
  }
);

GhostButton.displayName = 'GhostButton';
