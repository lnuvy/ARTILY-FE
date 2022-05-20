import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Test } from "../pages";
import styled from "styled-components";
import Loader from "../shared/Loader";

const Home = lazy(() => import("../pages/Home"));
const Store = lazy(() => import("../pages/Store"));
const StoreDetail = lazy(() => import("../pages/StoreDetail"));
const Review = lazy(() => import("../pages/Review"));
const ReviewDetail = lazy(() => import("../pages/ReviewDetail"));
const Login = lazy(() => import("../pages/Login"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const UserFollow = lazy(() => import("../pages/UserFollow"));
const RedirectKakao = lazy(() => import("../pages/RedirectKakao"));
const RedirectNaver = lazy(() => import("../pages/RedirectNaver"));

const NoAuthRoute = () => {
  return (
    <Suspense
      fallback={
        <LoaderWrap>
          <Loader />
        </LoaderWrap>
      }
    >
      <Switch>
        <Route path={["/home", "/"]} exact component={Home} />
        <Route path="/store/view/:postId" exact component={StoreDetail} />
        <Route path="/store" exact component={Store} />
        <Route path="/review" exact component={Review} />
        <Route path="/review/view/:reviewId" exact component={ReviewDetail} />
        <Route path="/userprofile/:userId" exact component={UserProfile} />
        <Route
          path="/userprofile/follow/:userId"
          exact
          component={UserFollow}
        />
        <Route path="/test" component={Test} />
        <Route path="/login" exact component={Login} />
        <Route path="/oauth/kakao/callback" component={RedirectKakao} />
        <Route path="/oauth/naver/callback" component={RedirectNaver} />
        <Route path="/*" component={Login} />
      </Switch>
    </Suspense>
  );
};

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

export default NoAuthRoute;
