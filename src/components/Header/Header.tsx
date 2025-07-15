import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.link__container}>
        <Link href={"/login"}>Login</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
      <span>Logo</span>
    </header>
  );
};

export default Header;
