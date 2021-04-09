import React from "react";
import { Input } from "antd";
import Avatar from "@/Avatar";
import Editor from "./Editor";
const { TextArea } = Input;
const AddComment = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "25px 0",
        padding: "14px",
        borderLeft: "2px solid #b3b3b3",
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <Avatar />
      </div>
      <TextArea style={{ margin: " 0 19px" }} placeholder="写下你的看法..." />
    </div>
  );
};

export default AddComment;
