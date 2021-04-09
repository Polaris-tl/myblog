const comments = {
  rows: [],
  count: 0,
  page: 1,
  pagesize: 5,
};

const commentsReducer = (state: CommentList = comments, action: Action<CommentList>) => {
  switch (action.type) {
    case "comment/getComments_success":
      return {
        ...state,
        ...action.payload,
      };
    case "comment/appendComment":
      const page = state.page || 0;
      return {
        ...state,
        page: page + 1,
        rows: [...state.rows, ...action.payload.rows],
      };
    default:
      return state;
  }
};

export default commentsReducer;
