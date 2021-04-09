import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const Nav: React.FC = () => {
  const [current, setCurrent] = useState("main");

  return (
    <div style={{ width: "830px" }}>
      <Menu selectedKeys={[current]} mode="horizontal" style={{ lineHeight: "60px" }}>
        <Menu.Item key="main">
          <Link to="/main">首页</Link>
        </Menu.Item>
        <Menu.Item key="user">
          <Link to="/user">个人中心</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Nav;
