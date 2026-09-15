// components/form/form.types.ts
import type { ReactNode } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type ChoiceOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};