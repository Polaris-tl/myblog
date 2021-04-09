import React from "react";
interface IData {
  title: string;
  id: string;
  level: string; // 1代表h1，2代表h2
  children?: IData[];
}

const Catalog: React.FC<{ cateInfo: IData[]; style?: {} }> = (props) => {
  const { cateInfo } = props;
  return (
    <ol style={{ listStyle: "none" }}>
      {cateInfo.map((item) => {
        if (item.children) {
          return (
            <li style={{ marginLeft: "17px" }} key={item.id}>
              <li>
                <a href={"#" + item.id}>{item.title}</a>
              </li>
              {<Catalog cateInfo={item.children} />}
            </li>
          );
        } else {
          return (
            <li style={{ marginLeft: "17px" }} key={item.id}>
              <a href={"#" + item.id}>{item.title}</a>
            </li>
          );
        }
      })}
    </ol>
  );
};
export default Catalog;
