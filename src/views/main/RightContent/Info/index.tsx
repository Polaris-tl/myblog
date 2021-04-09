import React from "react";
import { connect } from "react-redux";
import { GithubOutlined } from "@ant-design/icons";

import avatarDefault from "@src/assets/imgs/avatar.png";
import csdn from "@src/assets/imgs/csdn.png";
import juejin from "@src/assets/imgs/juejin.png";
import jianshu from "@src/assets/imgs/jianshu.png";

import styles from "./index.less";
const Info: React.FC<{ user: UserState }> = (props) => {
  const { user } = props;
  return (
    <div className={styles.infoBox}>
      <img className={styles.avatar} src={user.avatar ? user.avatar : avatarDefault} alt="polaris" />
      <p className={styles.name}>{user.username || "Polris-tl"}</p>
      <p className={styles.motto}>{user.motto || "To be a better man"}</p>
      <div className={styles.contact}>
        <div>
          {user.github && (
            <a href={user.github}>
              <GithubOutlined />
            </a>
          )}
        </div>
        <div>
          {user.csdn && (
            <a href={user.csdn}>
              <img style={{ width: "20px", position: "relative", top: "-1px" }} src={csdn} alt="csdn" />
            </a>
          )}
        </div>
        <div>
          {user.juejin && (
            <a href={user.juejin}>
              <img style={{ width: "20px", position: "relative", top: "-1px" }} src={juejin} alt="csdn" />
            </a>
          )}
        </div>
        <div>
          {user.jianshu && (
            <a href={user.jianshu}>
              <img style={{ width: "20px", position: "relative", top: "-1px" }} src={jianshu} alt="csdn" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default connect(({ user }: AllState) => {
  return {
    user,
  };
})(Info);
