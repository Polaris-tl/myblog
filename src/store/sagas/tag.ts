import { takeEvery, put } from "redux-saga/effects";
import getTag from "@src/server/tag/getTags";

function* getTagWorker(): Generator<any, any, any> {
  const res = yield getTag();
  yield put({
    type: "tag/getTags_success",
    payload: res.data,
  });
}

function* getTagWatcher(): Generator<any, any, any> {
  yield takeEvery("tag/getTags", getTagWorker);
}
export default [getTagWatcher()];
