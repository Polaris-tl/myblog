import request from "../../utils/request";

const getArticleByTagId = (params: { tagId: string }) => {
  return request.post<ResponseData<Article>>("/api/article/list/byTag", params);
};

export default getArticleByTagId;
