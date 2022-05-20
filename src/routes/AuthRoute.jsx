import React, { useEffect, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { socket } from "../shared/socket";
import { Test } from "../pages";
import styled from "styled-components";
import Loader from "../shared/Loader";

const Home = lazy(() => import("../pages/Home"));
const Chat = lazy(() => import("../pages/Chat"));
const ChatRoom = lazy(() => import("../pages/ChatRoom"));
const Store = lazy(() => import("../pages/Store"));
const StoreDetail = lazy(() => import("../pages/StoreDetail"));
// const StoreWrite = lazy(() => import("../pages/StoreWrite"));
const StoreEdit = lazy(() => import("../pages/StoreEdit"));
const SellComplete = lazy(() => import("../pages/SellComplete"));
const Follow = lazy(() => import("../pages/Follow"));
const Review = lazy(() => import("../pages/Review"));
const ReviewDetail = lazy(() => import("../pages/ReviewDetail"));
const ReviewSelect = lazy(() => import("../pages/ReviewSelect"));
const ReviewWrite = lazy(() => import("../pages/ReviewWrite"));
const MyPage = lazy(() => import("../pages/MyPage"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const UserFollow = lazy(() => import("../pages/UserFollow"));
const SetProfile = lazy(() => import("../pages/SetProfile"));
const RedirectKakao = lazy(() => import("../pages/RedirectKakao"));
const RedirectNaver = lazy(() => import("../pages/RedirectNaver"));
const MypageEdit = lazy(() => import("../pages/MypageEdit"));
const Manage = lazy(() => import("../pages/Manage"));
const DetailProfile = lazy(() => import("../pages/DetailProfile"));

const AuthRoute = () => {
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
        <Route path="/chat" exact component={Chat} />
        <Route path="/chat/:id" exact component={ChatRoom} />
        <Route path="/store" exact component={Store} />
        <Route path="/store/view/:postId" exact component={StoreDetail} />
        <Route path="/store/write" exact component={StoreEdit} />
        <Route path="/store/edit/:postId" exact component={StoreEdit} />
        <Route path="/completed/:postId" exact component={SellComplete} />
        <Route path="/follow" exact component={Follow} />
        <Route path="/review" exact component={Review} />
        <Route path="/review/view/:reviewId" exact component={ReviewDetail} />
        <Route path="/review/write/select" exact component={ReviewSelect} />
        <Route path="/review/write/:postId" exact component={ReviewWrite} />
        <Route path="/review/edit/:reviewId" exact component={ReviewWrite} />
        <Route path="/test" component={Test} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/userprofile/:userId" exact component={UserProfile} />
        <Route
          path="/userprofile/follow/:userId"
          exact
          component={UserFollow}
        />
        <Route path="/profile" exact component={SetProfile} />
        <Route path="/oauth/kakao/callback" component={RedirectKakao} />
        <Route path="/oauth/naver/callback" component={RedirectNaver} />
        <Route path="/mypage/edit" exact component={MypageEdit} />
        <Route path="/mypage/manage" exact component={Manage} />
        <Route path="/profile/detail" exact component={DetailProfile} />
        <Route path="/*" component={Test} />
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

export default AuthRoute;
