import styles from "./Input.module.scss";
import { InputProps } from "./Input.types";

export const Input: React.FC<InputProps> = ({
  label,
  error,
  register,
  className = "",
  ...rest
}) => {
  return (
    <div className={`${styles["input-wrapper"]} ${className}`}>
      {label && <label className={styles["input-label"]}>{label}</label>}
      <input
        className={`${styles["input-field"]}${
          error ? " " + styles["input-error"] : ""
        }`}
        {...register}
        {...rest}
      />
      {error && (
        <span className={styles["input-error-message"]}>
          {typeof error === "string" ? error : error.message}
        </span>
      )}
    </div>
  );
};
