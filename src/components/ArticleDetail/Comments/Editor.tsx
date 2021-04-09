import React, { useRef, useEffect } from 'react';
import { Form, Button, Input } from 'antd';

const { TextArea } = Input;

const Editor = ({
  onChange,
  onSubmit,
  onCancle,
  submitting,
  value,
  isLogin,
  placeholder,
  focus,
}: any) => {
  const textRef = useRef(null);
  useEffect(() => {
    if (focus) {
      (textRef as any).current.focus();
    }
  });
  return (
    <>
      <Form.Item>
        <TextArea
          rows={4}
          ref={textRef}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </Form.Item>
      <Form.Item>
        {isLogin ? (
          <>
            <Button
              htmlType="submit"
              loading={submitting}
              onClick={onSubmit}
              disabled={!isLogin}
              type="primary"
            >
              发表评论
            </Button>
            <Button
              style={
                placeholder != '对作者说点什么'
                  ? { display: 'inline-block' }
                  : { display: 'none' }
              }
              htmlType="submit"
              loading={submitting}
              onClick={onCancle}
              disabled={!isLogin}
              type="text"
            >
              取消回复
            </Button>
          </>
        ) : (
          <p>请右上角登录后回复评论</p>
        )}
      </Form.Item>
    </>
  );
};

export default Editor;
