import React from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, ClockCircleOutlined, EyeOutlined, TagOutlined } from "@ant-design/icons";
import styles from "./index.less";
import moment from "moment";

interface IProps {
  articles: Article[];
}
const colorList = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];

const Article = (props: Article) => {
  const { title, user, createdAt, tags, visitNum, id, categoryId, category } = props;
  return (
    <li className={styles.libox}>
      <div>
        <div className={styles.title}>
          <Link to={`/main/detail/${id}`}>{title}</Link>
        </div>
        <div className={styles.tags}>
          {tags.map((tag, idx) => {
            return (
              <Tag key={tag.id} color={colorList[idx % colorList.length]}>
                <Link to={`/main/tags/${tag.id}`}>{tag.name}</Link>
              </Tag>
            );
          })}
        </div>
        <div className={styles.info}>
          <div className={styles.author}>
            <UserOutlined />
            {user.author}
          </div>
          <div className={styles.time}>
            <ClockCircleOutlined />
            {moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}
          </div>
          <div className={styles.category}>
            <TagOutlined />
            <span>{category.categoryName}</span>
          </div>
          <div>
            <EyeOutlined />
            {visitNum}次
          </div>
        </div>
      </div>
    </li>
  );
};

const ArticleList = (props: IProps) => {
  const { articles } = props;
  return (
    <ul className={styles.ul}>
      {articles.map((article, idx) => (
        <Article key={idx} {...article} />
      ))}
    </ul>
  );
};

export default ArticleList;
