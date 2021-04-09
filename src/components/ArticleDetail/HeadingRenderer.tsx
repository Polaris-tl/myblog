import React from "react";
import Heading from "./Heading";
import randomId from "@src/utils/randomStr";

interface IProps {
  level: number;
  value: string;
}

const HeadingRenderer: React.FC<IProps> = (props) => {
  const renderHtml = () => {
    const { level, children } = props;
    if (children) {
      return <Heading level={`h${level}`}>{children}</Heading>;
    } else {
      return <>{children}</>;
    }
  };
  return <>{renderHtml()}</>;
};

export default HeadingRenderer;
