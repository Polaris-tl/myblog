import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import moment from "moment";
import CodeRenderer from "./CodeRenderer";
import Modal from "./Modal/Modal";
import Catalog from "./Catalog/catalog";
import styles from "./index.less";
import "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import randomStr from "@src/utils/randomStr";
import changeLikeStatus from "@src/server/article/changeLikeStatus";
import changeCollectStatus from "@src/server/article/changeCollectStatus";
import Comment from "./Comments";

import markdownStyles from "./markdown.less";

import like from "@src/assets/imgs/like.png";
import like_1 from "@src/assets/imgs/like_1.png";
import collect from "@src/assets/imgs/collect.png";
import collect_1 from "@src/assets/imgs/collect_1.png";
import comment from "@src/assets/imgs/comment.png";
import { message } from "antd";

interface IData {
  title: string;
  id: string;
  level: string; // 1代表h1，2代表h2, 3代表h3 ....
  children?: IData[];
}

const ArticleDetail: React.FC<{ articleDetail: Article; userId?: string; comments: CommentList }> = (props) => {
  const { content, title, createdAt, user, tags, visitNum, category, userFavouriteArticle, userCollectionArticle, collectNum, likeNum } = props.articleDetail;
  const { userId, comments } = props;
  const dispatch = useDispatch();
  const mdRef = useRef<HTMLDivElement>(null);
  //把数据库中的\n字符串换成回车符
  const mdValue = content.replace(/\\n/g, "\n");
  const [isLike, setIsLike] = useState(false);
  const [isCollection, setIsCollection] = useState(false);
  const { articleId } = useParams<{ articleId: string }>();
  const [cateInfo, setCateinfo] = useState<IData[]>([]);
  useEffect(() => {
    setIsLike(!!userFavouriteArticle);
    setIsCollection(!!userCollectionArticle);
  }, [userFavouriteArticle, userCollectionArticle]);
  useEffect(() => {
    document.body.scrollIntoView();
    dispatch({
      type: "article/getArticleDetail",
      payload: {
        id: articleId,
      },
    });
    // 在react-markdown 中没找到绘制完成的回调函数，这里通过setTimeout来模拟
    setTimeout(() => {
      //获取页面的h1,h2,h3,h4,h5,h6标签原始信息
      let categoryInfoFromDom: { level: string; title: string; id: string }[] = [];
      const heads = mdRef.current?.querySelectorAll<HTMLHeadElement>("h1,h2,h3,h4,h5,h6");
      if (heads) {
        heads.forEach((item) => {
          item.id = randomStr();
          categoryInfoFromDom.push({
            title: item.innerText,
            level: item.tagName[1],
            id: item.id,
          });
        });
      }
      // 根据原始信息来生成目录树信息，再传递给Catalog组件
      setCateinfo(generateCatalogTree(categoryInfoFromDom));
    }, 500);
  }, [articleId]);

  const handleLikeClick = () => {
    if (!userId) {
      message.warn("请先登录哦！");
      return;
    }
    dispatch({
      type: "article/getArticleDetail_success",
      payload: {
        likeNum: isLike ? likeNum - 1 : likeNum + 1,
      },
    });
    setIsLike(!isLike);
    changeLikeStatus({
      userId: userId,
      articleId: articleId,
      status: !isLike,
    });
  };
  const handleCollectClick = () => {
    if (!userId) {
      message.warn("请先登录哦！");
      return;
    }
    dispatch({
      type: "article/getArticleDetail_success",
      payload: {
        collectNum: isCollection ? collectNum - 1 : collectNum + 1,
      },
    });
    setIsCollection(!isCollection);
    changeCollectStatus({
      userId: userId,
      articleId: articleId,
      status: !isCollection,
    });
  };
  return (
    <div>
      <div className={styles.leftBox}>
        <div>
          <img src={isLike ? like_1 : like} onClick={handleLikeClick} />
          <span>{likeNum}</span>
        </div>
        <div>
          <img src={isCollection ? collect_1 : collect} style={{ width: "54%" }} onClick={handleCollectClick} />
          <span>{collectNum}</span>
        </div>
        <div>
          <a href="#comments" style={{ textAlign: "center" }}>
            <img src={comment} alt="" style={{ width: "50%" }} />
            <span>{comments.count}</span>
          </a>
        </div>
      </div>
      <div className={styles.article}>
        <p className={styles.title}>{title}</p>
        <div className={styles.infoBox}>
          <p>作者:{user.author}</p>
          <p>时间:{moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}</p>
          <p>浏览: {visitNum}次</p>
          <p>
            标签:&nbsp;
            {tags.map((tag) => {
              return <span key={tag.id}>{tag.name}</span>;
            })}
          </p>
          <p>分类:&nbsp;{category.categoryName}</p>
        </div>
      </div>
      <div ref={mdRef}>
        <ReactMarkdown
          className={markdownStyles.mardownBox}
          source={mdValue}
          escapeHtml={false}
          renderers={{
            code: CodeRenderer,
            // heading: HeadingRenderer,
          }}
        />
        <Modal>
          <p className={styles.catalog}>目录</p>
          <Catalog cateInfo={cateInfo} />
        </Modal>

        <div id="comments">
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default connect(({ articleDetail, user, comments }: AllState) => {
  return {
    comments,
    articleDetail,
    userId: user.id,
  };
})(ArticleDetail);

// 生成目录树算法
const generateCatalogTree = (origin: { title: string; level: string; id: string }[]): IData[] => {
  let res = [];
  let stack: any = [];
  for (let i = 0; i < origin.length; i++) {
    if (stack.length == 0) {
      const obj = {
        title: origin[i].title,
        level: origin[i].level,
        id: origin[i].id,
      };
      res.push(obj);
      stack.push(obj);
      continue;
    }
    //当前标签级别和上一个相同时
    if (origin[i].level == stack[stack.length - 1].level) {
      const obj = {
        title: origin[i].title,
        level: origin[i].level,
        id: origin[i].id,
      };
      if (stack.length > 1) {
        stack[stack.length - 2].children = stack[stack.length - 2].children || [];
        stack[stack.length - 2].children.push(obj);
      } else {
        res.push(obj);
      }
      stack[stack.length - 1] = obj;
      continue;
    }
    //当前标签级别比上一个大时，说明要在上一个标签中增加children属性
    if (origin[i].level > stack[stack.length - 1].level) {
      const obj = {
        title: origin[i].title,
        level: origin[i].level,
        id: origin[i].id,
      };
      stack[stack.length - 1].children = stack[stack.length - 1].children || [];
      stack[stack.length - 1].children.push(obj);
      stack.push(obj);
      continue;
    }
    if (origin[i].level < stack[stack.length - 1].level) {
      const obj = {
        title: origin[i].title,
        level: origin[i].level,
        id: origin[i].id,
      };
      while (stack.length != 0 && origin[i].level <= stack[stack.length - 1].level) {
        stack.pop();
      }
      if (stack.length != 0) {
        stack[stack.length - 1].children = stack[stack.length - 1].children || [];
        stack[stack.length - 1].children.push(obj);
        stack.push(obj);
      } else {
        res.push(obj);
        stack.push(obj);
      }
      continue;
    }
  }
  return res;
};
