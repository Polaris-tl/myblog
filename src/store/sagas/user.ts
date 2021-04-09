import { takeEvery, put } from "redux-saga/effects";
import login, { ILogin } from "@src/server/user/login";
import register, { IRegister } from "@src/server/user/register";
import { message } from "antd";

function* loginWorker(action: Action<ILogin>): Generator<any, any, any> {
  const res = yield login(action.payload);
  const { payload } = action;
  yield put({
    type: "user/login_success",
    payload: {
      ...res.data,
      token: res.token,
    },
  });
  if (payload.isRememberPassWord) {
    localStorage.setItem("password", payload.password);
    localStorage.setItem("username", payload.username);
  } else {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  }
  (action as any).history.push("/main");
}

function* registerWorker(action: Action<IRegister>): Generator<any, any, any> {
  const res = yield register(action.payload);
  if (res.success) {
    message.warn("注册成功，请登录~");
    (action as any).history.push("/login");
  } else {
    message.warn(res.message);
  }
}

function* loginWatcher() {
  yield takeEvery("user/login", loginWorker);
}

function* registerWatcher() {
  yield takeEvery("user/register", registerWorker);
}

// 使用数组导出
const rootUser = [loginWatcher(), registerWatcher()];

export default rootUser;
