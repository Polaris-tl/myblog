declare interface ResponseData<T = any> {
  data: T;
  success: boolean;
  token?: string;
  message?: string;
}
