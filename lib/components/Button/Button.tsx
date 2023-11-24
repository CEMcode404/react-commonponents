import styles from "./button.module.css";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, className, ...restProps } = props;
  return (
    <button className={`${className} ${styles.button}`} {...restProps}>
      {children}
    </button>
  );
}
