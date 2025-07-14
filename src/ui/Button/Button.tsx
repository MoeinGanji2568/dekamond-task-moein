import { FC } from "react";
import styles from "./Button.module.scss";
import { ButtonProps, ButtonVariant } from "./Button.types";

const btnType: Record<ButtonVariant, string> = {
  primary: styles["btn--primary"],
  secondary: styles["btn--secondary"],
  outline: styles["btn--outline"],
  danger: styles["btn--danger"],
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${btnType[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};
