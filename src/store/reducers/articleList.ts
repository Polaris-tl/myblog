const initState = {
  categoryId: "-1",
  rows: [],
  count: 0,
  page: 1,
  pagesize: 6,
};

const articleList = function (state: ArticleList = initState, action: Action<{ rows: Article[] }>) {
  switch (action.type) {
    case "article/getArticleList_success":
    case "article/getArticleByTagId_success":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default articleList;
