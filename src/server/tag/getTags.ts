import request from "../../utils/request";

const getTags = () => {
  return request.post<ResponseData<Tag>>("/api/tags");
};

export default getTags;
