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
  UserProfile,
} from "../pages";

const NoAuthRoute = () => {
  return (
    <Switch>
      <Route path={["/home", "/"]} exact component={Home} />
      <Route path="/store/view/:postId" exact component={StoreDetail} />
      <Route path="/store" exact component={Store} />
      <Route path="/review" exact component={Review} />
      <Route path="/review/view/:reviewId" exact component={ReviewDetail} />
      <Route path="/userprofile/:userId" exact component={UserProfile} />
      <Route path="/test" component={Test} />
      <Route path="/login" exact component={Login} />
      <Route path="/oauth/kakao/callback" component={RedirectKakao} />
      <Route path="/oauth/naver/callback" component={RedirectNaver} />
      <Route path="/*" component={Login} />
    </Switch>
  );
};

export default NoAuthRoute;
