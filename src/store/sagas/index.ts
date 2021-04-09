import { all } from "redux-saga/effects";
import userSagas from "./user";
import rootArticle from "./article";
import categories from "./category";
import tags from "./tag";
import comments from "./comment";

export default function* rootSaga() {
  yield all([...userSagas, ...rootArticle, ...categories, ...tags, ...comments]);
}
