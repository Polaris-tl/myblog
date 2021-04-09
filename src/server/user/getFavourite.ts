import request from "../../utils/request";

export interface IFavourite {
  username: string;
  avatar: string;
  id: string;
  email: string;
}

export const getFavourite = () => {
  return request.post<ResponseData<IFavourite>>("/api/user/getFavourite");
};
