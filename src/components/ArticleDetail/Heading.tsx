import React from "react";

export interface IHeading {
  level: string;
  [key: string]: any;
}
const Heading: React.FC<IHeading> = ({ level, children, ...props }) => {
  return React.createElement(level || "h1", props, children);
};

export default Heading;
