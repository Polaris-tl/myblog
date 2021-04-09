import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./views/login";
import Main from "./views/main";
import PageNotFound from "./views/pageNotFound";
import Register from "./views/register/register";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/main" component={Main} />
      <Route path="/register" component={Register} />
      <Route component={PageNotFound} />
    </Switch>
  );
};
export default App;
