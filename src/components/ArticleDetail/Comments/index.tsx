import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import moment from "moment";
import { message } from "antd";
import Avatar from "@/Avatar";
import AddComment from "./AddComment";
import styles from "./index.less";
import like from "@src/assets/imgs/like.png";
import like_1 from "@src/assets/imgs/like_1.png";

interface IProps {
  articleDetail: Article;
  comments: CommentList;
  userId?: string;
}

const MyComment: React.FC<IProps> = (props) => {
  const {
    comments,
    userId,
    articleDetail: { id: articeId },
  } = props;
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const handleLikeClick = () => {
    if (!userId) {
      message.warn("请先登录哦！");
      return;
    }
    // dispatch({
    //   type: "article/getArticleDetail_success",
    //   payload: {
    //     likeNum: isLike ? likeNum - 1 : likeNum + 1,
    //   },
    // });
    setIsLike(!isLike);
    // changeLikeStatus({
    //   userId: userId,
    //   articleId: articleId,
    //   status: !isLike,
    // });
  };

  useEffect(() => {
    dispatch({
      type: "comment/getComments",
      payload: {
        articleId: articeId,
      },
    });
  }, [articeId]);
  // useEffect(() => {
  //   setIsLike(!!userFavouriteArticle);
  //   setIsCollection(!!userCollectionArticle);
  // }, [userFavouriteArticle, userCollectionArticle]);

  interface IProps {
    comment: Comment_;
  }

  const CommentItem: React.FC<IProps> = (props) => {
    const { comment, user, pId, createdAt, replyTo, children } = props.comment;
    return (
      <div className={styles.commentBox}>
        <div className={styles.left}>
          <Avatar src={user.username} />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{user.username}</div>
          <div className={styles.comment}>{replyTo ? `回复 ${replyTo} : ${comment}` : comment}</div>
          <div className={styles.info}>
            <div>{moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}</div>
            <div style={{ display: "flex" }}>
              <div className={styles.like}>
                <img src={isLike ? like_1 : like} onClick={handleLikeClick} />
                <span>{comments.count}</span>
              </div>
              <div className={styles.reply}>回复</div>
            </div>
          </div>
          <div>
            {children &&
              children.map((item) => {
                return <CommentItem comment={item} key={item.id} />;
              })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <AddComment />
      {comments.rows.map((item) => {
        return <CommentItem comment={item} key={item.id} />;
      })}
    </div>
  );
};

export default connect(({ articleDetail, user, comments }: AllState) => {
  return {
    articleDetail,
    userId: user.id,
    comments,
  };
})(MyComment);
