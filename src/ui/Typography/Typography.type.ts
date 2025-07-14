import { ReactNode, JSX } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "blockquote";

export type TypographyProps = {
  variant?: TypographyVariant;
  className?: string;
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
};
