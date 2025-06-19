import { type PropsWithChildren } from "react";
import styles from "./ContentWrapper.module.css";

const ContentWrapper = ({ children }: PropsWithChildren) => (
  <div className={styles.wrapper}>{children}</div>
);

export { ContentWrapper };
