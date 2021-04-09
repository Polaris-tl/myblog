import request from "../../utils/request";
import { ArticleListParams } from "@src/server/article/getArticleList";

const getCategory = (params: ArticleListParams) => {
  return request.post<ResponseData<Tag>>("/api/category", params);
};

export default getCategory;
