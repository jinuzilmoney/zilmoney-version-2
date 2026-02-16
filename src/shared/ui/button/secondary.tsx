"use client";

import { forwardRef } from "react";
import { ButtonBase, type ButtonBaseProps } from "./Button";

export const SecondaryButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (props, ref) => {
    return <ButtonBase ref={ref} variant="secondary" {...props} />;
  },
);

SecondaryButton.displayName = "SecondaryButton";
