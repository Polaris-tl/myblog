import React from "react";

const style = {
  s1: {
    height: "40px",
    background: "#f9f9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  s2: { margin: 0 },
};

const Footer = () => {
  return (
    <div style={style.s1}>
      <p style={style.s2}>
        渝ICP备 <a href="www.beian.miit.gov.cn">19003184</a> 号
      </p>
    </div>
  );
};

export default Footer;
