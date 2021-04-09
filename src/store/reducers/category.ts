const initState: [] = [];

const categories = (state: Category[] = initState, action: Action<Category[]>) => {
  switch (action.type) {
    case "category/getCategory_success":
      return [...action.payload];
    default:
      return state;
  }
};

export default categories;
