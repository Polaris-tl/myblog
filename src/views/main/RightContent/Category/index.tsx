import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./index.less";
import Card from "../Card";

import { ArticleListParams } from "@src/server/article/getArticleList";

const Category: React.FC<{ categories: Category[] }> = (props) => {
  const history = useHistory();
  // 这里的dispatch签名是模拟实现的，在网上没找到相关写法
  const dispatch: MyDispatch<ArticleListParams> = useDispatch();
  const [categoryId, setCategoryId] = useState("-1");
  const [random, setRandom] = useState(1);

  const Item: React.FC<{ category: Category; getData: any }> = (props) => {
    const { id, name, count } = props.category;
    return (
      <li
        key={id}
        className={`${styles.li}`}
        onClick={() => {
          history.push("/main");
          props.getData(Math.random());
          setCategoryId(id);
        }}
      >
        <div className={`${styles.infoBox} ${categoryId == id ? styles.active : ""}`}>
          <p className={styles.name}>{name}</p>
          <p className={styles.count}>{count}篇</p>
        </div>
      </li>
    );
  };

  useEffect(() => {
    dispatch({
      type: "category/getCategory",
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "article/getArticleList",
      payload: {
        categoryId,
      },
    });
  }, [categoryId, random]);

  const { categories } = props;
  const total = categories.reduce((all, pre) => {
    return all + pre.count;
  }, 0);
  return (
    <Card title="文章分类">
      <div>
        <ul className={styles.ul}>
          <Item category={{ id: "-1", name: "全部", count: total, createdAt: "" }} getData={setRandom}></Item>
          {categories.map((category) => {
            return <Item key={category.id} category={category} getData={setRandom}></Item>;
          })}
        </ul>
      </div>
    </Card>
  );
};

export default connect(({ categories }: AllState) => {
  return {
    categories,
  };
})(Category);
