const initState: Article = {
  id: "",
  title: "",
  user: {
    author: "",
  },
  content: "",
  userId: "",
  categoryId: 0,
  category: {
    categoryName: "",
  },
  tags: [],
  isHot: 0,
  visitNum: 0,
  createdAt: "",
  updatedAt: "",
  userFavouriteArticle: false,
  userCollectionArticle: false,
  likeNum: 0,
  collectNum: 0,
};
const articleDetail = function (state: Article = initState, action: Action<Article>) {
  switch (action.type) {
    case "article/getArticleDetail_success":
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};
export default articleDetail;
