'use client';

import { forwardRef } from 'react';
import { ButtonBase, type ButtonBaseProps } from './Button';

export const DestructiveButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props, ref) => {
    return <ButtonBase ref={ref} variant="destructive" {...props} />;
  }
);

DestructiveButton.displayName = 'DestructiveButton';
