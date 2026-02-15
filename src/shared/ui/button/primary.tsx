'use client';

import { forwardRef } from 'react';
import { ButtonBase, type ButtonBaseProps } from './Button';

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props, ref) => {
    return <ButtonBase ref={ref} variant="primary" {...props} />;
  }
);

PrimaryButton.displayName = 'PrimaryButton';
