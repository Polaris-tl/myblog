import React from "react";
import banner from "@src/assets/imgs/banner.jpg";
import { useRouteMatch } from "react-router-dom";
const Banner = () => {
  const match = useRouteMatch({
    path: "/main",
    strict: true,
    sensitive: true,
  });
  return (
    <div style={{ width: "100%", maxHeight: match?.isExact ? "400px" : "0px", overflow: "hidden", transition: "all ease 0.3s" }}>
      <img src={banner} alt="asdasd" />
    </div>
  );
};
export default Banner;
