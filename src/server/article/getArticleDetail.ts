import request from "../../utils/request";
export interface ArticleDetailParams {
  id: string;
}

const getArticleDetail = (params: ArticleDetailParams) => {
  return request.post<ResponseData<Article[]>>("/api/article/detail", params);
};

export default getArticleDetail;
