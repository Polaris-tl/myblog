const initState = {
  login: false,
  username: "",
  email: "",
  avatar: "",
  id: "",
  role: "",
  motto: "",
  token: "",
  github: "",
  juejin: "",
  jianshu: "",
  csdn: "",
};
const user = function (state: UserState = initState, action: Action<UserState>) {
  switch (action.type) {
    case "user/login_success":
      return Object.assign({}, state, {
        ...action.payload,
        login: true,
      });
    case "user/logout":
      return Object.assign(
        {},
        {
          ...initState,
        }
      );
    default:
      return state;
  }
};
export default user;
