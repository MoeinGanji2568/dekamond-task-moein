import { Typography } from "@/ui/Typography";
import { ReactNode } from "react";
import styles from "./layout.module.scss";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-col">
      <div className={styles.panelHeader}>
        <Typography variant="h5">UserPanel</Typography>
        <Typography variant="p">Welcome Moein GAnji</Typography>
      </div>
      <main className="">{children}</main>
    </div>
  );
}
