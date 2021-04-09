import { combineReducers } from "redux";
import user from "./user";
import articleList from "./articleList";
import articleDetail from "./articleDetail";
import categories from "./category";
import tags from "./tags";
import comments from "./comments";

const allReducers = combineReducers({
  user,
  articleList,
  articleDetail,
  categories,
  tags,
  comments,
});

export default allReducers;
