import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Switch, Route } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import RightContent from ".././RightContent";
import ArticleList from "@/ArticleList";
import ArticleDetail from "@/ArticleDetail";
import styles from "./index.less";

interface IProps {
  articleList: ArticleList;
}

const Content: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(5);
  const { articleList } = props;

  const pageChange = (page: number, pageSize?: number) => {
    setPage(page);
    setPagesize(pageSize || 5);
  };

  useEffect(() => {
    dispatch({
      type: "article/getArticleList",
      payload: {
        page,
        pagesize,
        categoryId: articleList.categoryId,
      },
    });
  }, [page]);

  return (
    <div className={styles.contentBox}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Switch>
            <Route exact path={`/main`}>
              <ArticleList articles={articleList.rows} />
              <Pagination defaultCurrent={1} className={styles.pager} showSizeChanger={false} pageSize={pagesize} current={page} total={articleList.count} onChange={pageChange} />
            </Route>
            <Route path={`/main/detail/:articleId`} component={ArticleDetail} />
          </Switch>
        </div>
        <div className={styles.right}>
          <RightContent />
        </div>
      </div>
    </div>
  );
};
export default connect(({ articleList }: AllState) => {
  return {
    articleList,
  };
})(Content);
