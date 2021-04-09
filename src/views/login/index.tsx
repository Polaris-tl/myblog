import React, { useEffect, useState } from "react";
import { Button, Row, Form, Input, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import styles from "./index.less";

const Login: React.FC<{ user: UserState }> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRemmenber, setIsRemmenber] = useState(false); //是否记住密码

  const userChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const passChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const isRemmenberChange = (e: any) => setIsRemmenber(e.target.checked);

  const onFinish = () => {
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    dispatch({
      type: "user/login",
      payload: {
        username,
        password,
        isRememberPassWord: isRemmenber,
      },
      history, //这里用了hack的方法，不然在saga中没法使用react-router-dom的路由跳转方法
    });
  };

  if (props.user.login) {
    history.push("/main");
  }

  useEffect(() => {
    const password = localStorage.getItem("password");
    const username = localStorage.getItem("username");
    if (password && username) {
      form.setFieldsValue({
        username: username,
        password: password,
        remember: true,
      });
    }
  }, []);

  return (
    <Row align="middle" justify="center" className={styles.outerBox}>
      <div className={styles.innerBox}>
        <h3 className={styles.title}>登录</h3>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
            <Input onChange={userChange} prefix={<MailOutlined />} allowClear={true} placeholder="请输入用户名" value={username} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
            <Input.Password prefix={<LockOutlined />} onChange={passChange} type="password" allowClear={true} placeholder="请输入密码" value={password} />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox checked={isRemmenber} onChange={isRemmenberChange}>
                记住密码
              </Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
          <Link to="/register">注册账户</Link>
        </Form>
      </div>
    </Row>
  );
};

export default connect(({ user }: AllState) => ({
  user,
}))(Login);
