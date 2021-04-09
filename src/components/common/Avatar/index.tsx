import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Iprops {
    className?:string,
    size?: number | "small" | "default" | "large" | undefined,
    src?: string,
    style?:React.CSSProperties,
}

const UserAvatar:React.FC<Iprops> = (props: Iprops) =>
  props.src ? (
    <Avatar size={props.size || 'default'} src={props.src} />
  ) : (
    <Avatar size={props.size || 'default'} icon={<UserOutlined />} />
  );

export default UserAvatar;