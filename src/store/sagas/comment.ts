import { takeEvery, put } from "redux-saga/effects";
import { getComments } from "@src/server/comment";

function* getCommentsWorker(action: Action<{ articleId: string; pId?: string }>): Generator<any, any, any> {
  const res = yield getComments({ ...action.payload });
  yield put({
    type: "comment/getComments_success",
    payload: res.data,
  });
}

function* getCommentsWatcher(): Generator<any, any, any> {
  yield takeEvery("comment/getComments", getCommentsWorker);
}
export default [getCommentsWatcher()];
