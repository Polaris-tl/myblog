import React, { useState } from "react";
import { Button, Row, Form, Input, Checkbox, Tooltip, message } from "antd";
import { LockOutlined, UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./register.less";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [allow, setAllow] = useState(false);
  const [form] = Form.useForm();
  const onFinish = () => {
    if (!allow) {
      return message.info("请勾选用户协议");
    }
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    dispatch({
      type: "user/register",
      payload: {
        username,
        password,
      },
      history, //这里用了hack的方法，不然在saga中没法使用react-router-dom的路由跳转方法
    });
  };
  return (
    <>
      <Row className={styles.outerBox}>
        <div className={styles.innerBox}>
          <h3 className={styles.title}>注册</h3>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "账号必填",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" allowClear={true} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
              <Input.Password prefix={<LockOutlined />} autoComplete="off" type="password" placeholder="请输入你的密码" />
            </Form.Item>
            <Form.Item
              name="repassword"
              rules={[
                { required: true, message: "请再次输入密码" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("两次密码不一致");
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} type="password" placeholder="请输入你的密码" />
            </Form.Item>

            <Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox checked={allow} onChange={() => setAllow(!allow)}>
                    <Tooltip title="我们都将暴富！">
                      <QuestionCircleOutlined />
                      用户协议
                    </Tooltip>
                  </Checkbox>
                </Form.Item>
              </Form.Item>
              <Button block type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
            <Link to="/login">登录账户</Link>
          </Form>
        </div>
      </Row>
    </>
  );
};

export default Register;
