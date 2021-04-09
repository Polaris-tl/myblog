import { takeEvery, put } from "redux-saga/effects";
import getCategory from "@src/server/category/getCategory";

import { ArticleListParams } from "@src/server/article/getArticleList";

function* getCategoryWorker(action: Action<ArticleListParams>): Generator<any, any, any> {
  const res = yield getCategory(action.payload);
  yield put({
    type: "category/getCategory_success",
    payload: res.data,
  });
}

function* getCategoryWatcher(): Generator<any, any, any> {
  yield takeEvery("category/getCategory", getCategoryWorker);
}
export default [getCategoryWatcher()];
