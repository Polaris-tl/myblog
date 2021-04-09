import React from "react";
import styles from "./index.less";
interface IProps {
  title: string;
}
const Card: React.FC<IProps> = (props) => {
  const { children, title } = props;
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      {children}
    </div>
  );
};
export default Card;
