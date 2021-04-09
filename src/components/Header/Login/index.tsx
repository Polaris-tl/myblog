import React from "react";
import UserAvatar from "@/common/Avatar";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Dropdown } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import styles from "./index.less";
const Login: React.FC<{ user: UserState }> = (props) => {
  const { user } = props;
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "user/logout" });
    dispatch({
      type: "article/getArticleDetail_success",
      payload: {
        userFavouriteArticle: null,
        userCollectionArticle: null,
      },
    });
  };
  return !user.login ? (
    <div className={styles.box}>
      <UserAvatar size={35} className={styles.avtor} />
      <span className={styles.text}>
        <Link to={{ pathname: "/login", state: { from: location.pathname } }}>登录</Link>
        <span className={styles.dot}>·</span>
        <Link to="/register">注册</Link>
      </span>
    </div>
  ) : (
    <div className={styles.box}>
      <Dropdown
        overlay={() => {
          return (
            <div className={styles.dropdown}>
              <LogoutOutlined style={{ marginRight: "5px", marginLeft: "6px" }} />
              <span onClick={logout} style={{ cursor: "pointer" }}>
                注销
              </span>
            </div>
          );
        }}
        placement="bottomLeft"
      >
        <div>
          <UserAvatar size={35} src={user.avatar} className={styles.avtor} />
          <span className={styles.text}>{user.username}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default connect(({ user }: AllState) => {
  return {
    user,
  };
})(Login);
