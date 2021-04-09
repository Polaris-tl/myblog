import { takeEvery, put } from "redux-saga/effects";
import getArticleList, { ArticleListParams } from "@src/server/article/getArticleList";
import getArticleDetail, { ArticleDetailParams } from "@src/server/article/getArticleDetail";
import getArticleByTagId from "@src/server/article/getArticleByTagId";

function* getArticleListWorker(action: Action<ArticleListParams>): Generator<any, any, any> {
  const res = yield getArticleList(action.payload);
  if (res.success) {
    yield put({
      type: "article/getArticleList_success",
      payload: {
        ...res.data,
        categoryId: action.payload.categoryId || "-1",
      },
    });
  }
}

function* getArticleDetailWorker(action: Action<ArticleDetailParams>): Generator<any, any, any> {
  const res = yield getArticleDetail(action.payload);
  if (res.success) {
    yield put({
      type: "article/getArticleDetail_success",
      payload: {
        ...res.data,
      },
    });
  }
}
function* getArticleByTagIdWorker(action: Action<any>): Generator<any, any, any> {
  const res = yield getArticleByTagId(action.payload);
  if (res.success) {
    yield put({
      type: "article/getArticleByTagId_success",
      payload: {
        ...res.data,
      },
    });
  }
}

function* getArticleListWatcher() {
  yield takeEvery("article/getArticleList", getArticleListWorker);
}

function* getArticleDetailWatcher() {
  yield takeEvery("article/getArticleDetail", getArticleDetailWorker);
}

function* getArticleByTagIdWatcher() {
  yield takeEvery("article/getArticleByTagId", getArticleByTagIdWorker);
}

const rootArticle = [getArticleListWatcher(), getArticleDetailWatcher(), getArticleByTagIdWatcher()];

export default rootArticle;
