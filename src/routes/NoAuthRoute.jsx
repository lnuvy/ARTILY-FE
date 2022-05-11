import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Login,
  RedirectKakao,
  RedirectNaver,
  Review,
  ReviewDetail,
  Store,
  StoreDetail,
  Test,
} from "../pages";

const NoAuthRoute = () => {
  return (
    <Switch>
      <Route path={["/home", "/"]} exact component={Home} />
      <Route path="/store" exact component={Store} />
      <Route path="/store/view/:postId" exact component={StoreDetail} />
      <Route path="/store" exact component={Store} />
      <Route exact path="/review" component={Review} />
      <Route exact path="/review/:reviewId" component={ReviewDetail} />
      <Route path="/test" component={Test} />
      <Route path="/login" exact component={Login} />
      <Route path="/oauth/kakao/callback" component={RedirectKakao} />
      <Route path="/oauth/naver/callback" component={RedirectNaver} />
      <Route path="/*" component={Login} />
    </Switch>
  );
};

export default NoAuthRoute;
