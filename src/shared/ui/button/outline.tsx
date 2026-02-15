'use client';

import { forwardRef } from 'react';
import { ButtonBase, type ButtonBaseProps } from './Button';

export const OutlineButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props, ref) => {
    return <ButtonBase ref={ref} variant="outline" {...props} />;
  }
);

OutlineButton.displayName = 'OutlineButton';
