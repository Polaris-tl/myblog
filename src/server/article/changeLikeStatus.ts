import request from "../../utils/request";

const changeLikeStatus = (params: { userId: string; articleId: string; status: boolean }) => {
  return request.post<ResponseData<Article>>("/api/article/changeLikeStatus", params);
};

export default changeLikeStatus;
