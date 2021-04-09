//用户信息
declare interface UserState {
  login: boolean;
  username: string;
  email: string;
  avatar: string;
  id: string;
  role: string;
  motto: string;
  github: string;
  csdn: string;
  juejin: string;
  jianshu: string;
}

// 文章信息
declare interface Article {
  id: string;
  title: string;
  content: string;
  user: {
    author: string;
  };
  userId: string;
  categoryId: number;
  category: {
    categoryName: string;
  };
  tags: { id: string; name: string }[];
  isHot: 0 | 1;
  visitNum: number;
  createdAt: string;
  updatedAt: string;
  userFavouriteArticle: boolean;
  userCollectionArticle: boolean;
  likeNum: number;
  collectNum: number;
}

// 文章列表信息
declare interface ArticleList {
  categoryId: string;
  rows: Article[] | [];
  page?: number;
  pagesize?: number;
  count: number;
}

// 分类
declare interface Category {
  id: string;
  name: string;
  count: number;
  createdAt: string;
}

// 标签
declare interface Tag extends Category {}

type Dispatch<T> = {
  type: string;
  payload?: T;
};

declare interface MyDispatch<T = any> {
  <A = Dispatch<T>>(action: A): void;
}

//这里加了个下划线 不然类型会和浏览器中原生的Comment接口类型起冲突
declare interface Comment_ {
  id: string;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  replyTo?: stirng;
  children?: Comment_[];
  pId?: string;
}

declare interface CommentList {
  count: number;
  rows: Comment_[];
  page?: number;
  pagesize: number;
}

declare interface AllState {
  user: UserState;
  articleList: ArticleList;
  articleDetail: Article;
  tags: Tag[];
  categories: Category[];
  comments: CommentList;
}
