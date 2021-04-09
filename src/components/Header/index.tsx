import React, { useEffect } from "react";
import Nav from "./Nav";
import Login from "./Login";

import styles from "./index.less";

const Header: React.FC = () => {
  return (
    <div className={styles.outerBox}>
      <div className={styles.headerBox}>
        <div>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>Polaris的博客</p>
        </div>
        <Nav />
        <Login />
      </div>
    </div>
  );
};

export default Header;
