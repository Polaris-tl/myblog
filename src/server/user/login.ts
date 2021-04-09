import request from "../../utils/request";

export interface ILogin {
  username: string;
  password: string;
  isRememberPassWord?: boolean;
}

const login = (params: ILogin) => request.post<any, ResponseData<UserState>>("/api/login", params);

export default login;
