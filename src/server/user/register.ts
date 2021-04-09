import request from "../../utils/request";

export interface IRegister {
  username: string;
  password: string;
}

const register = (params: IRegister) => request.post<any, ResponseData>("/api/register", params);

export default register;
