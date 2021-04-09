import request from "../../utils/request";

export const getComments = (params: { articleId: string; page?: string; pagesize?: string }) => {
  return request.post<ResponseData<Comment>>("/api/comment/getComment", params);
};
