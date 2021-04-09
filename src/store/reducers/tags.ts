const initState: [] = [];

const tags = (state: Tag[] = initState, action: Action<Tag[]>) => {
  switch (action.type) {
    case "tag/getTags_success":
      return [...action.payload];
    default:
      return state;
  }
};

export default tags;
