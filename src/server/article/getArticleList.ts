import request from "../../utils/request";

export interface ArticleListParams {
  page: number;
  pagesize: number;
  tagId: string;
  categoryId: string;
}

const getArticleList = (params: ArticleListParams) => {
  return request.post<ResponseData<Article>>("/api/article/list", params);
};

export default getArticleList;
