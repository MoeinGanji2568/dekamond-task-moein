import classNames from "classnames";
import { TypographyProps, TypographyVariant } from "./Typography.type";
import styles from "./Typography.module.scss";

const variantClasses: Record<TypographyVariant, string> = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  h5: styles.h5,
  h6: styles.h6,
  p: styles.p,
  small: styles.small,
  blockquote: styles.blockquote,
};

export const Typography = ({
  variant = "p",
  className,
  children,
  as,
}: TypographyProps) => {
  const Component = as || variant;

  return (
    <Component className={classNames(variantClasses[variant], className)}>
      {children}
    </Component>
  );
};
