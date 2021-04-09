import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./index.less";
import Card from "../Card";

interface ITag {
  name: string;
  id: string;
  color: string;
}

const colors = ["#e15b64", "#f47e60", "#849b87", "#f8b26a", "#f47e60", "#67cc86", "#3498db", "#abbd81"];
const Tag: React.FC<{ tag: ITag }> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, name, color } = props.tag;
  return (
    <span
      className={styles.tag}
      style={{ background: color }}
      onClick={() => {
        history.push("/main");
        dispatch({
          type: "article/getArticleByTagId",
          payload: {
            tagId: id,
          },
        });
      }}
    >
      {name}
    </span>
  );
};

const Tags: React.FC<{ tags: Tag[] }> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "tag/getTags",
    });
  }, []);
  const { tags } = props;
  return (
    <Card title="文章标签">
      <div className={styles.tagBox}>
        {tags.map((tag, idx) => {
          return <Tag key={tag.id} tag={{ ...tag, color: colors[idx % colors.length] }} />;
        })}
      </div>
    </Card>
  );
};
export default connect(({ tags }: AllState) => {
  return {
    tags,
  };
})(Tags);
