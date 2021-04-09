import request from "../../utils/request";

const changeCollectStatus = (params: { userId: string; articleId: string; status: boolean }) => {
  return request.post<ResponseData<Article>>("/api/article/changeCollectStatus", params);
};

export default changeCollectStatus;
