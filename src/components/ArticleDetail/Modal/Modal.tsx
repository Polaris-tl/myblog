import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
const Modal: React.FC = (props) => {
  const div = useRef<any>(null);
  div.current = document.createElement("div");
  const leftContent = document.querySelector("#modalContainer");
  const referedNode: any = leftContent?.firstChild?.nextSibling;
  leftContent?.insertBefore(div.current, referedNode);
  useEffect(() => {
    return () => {
      div.current.parentNode.removeChild(div.current);
    };
  }, []);
  return ReactDOM.createPortal(props.children, div.current);
};
export default Modal;
