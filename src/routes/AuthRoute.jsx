import { Route, Switch } from "react-router-dom";
import {
  Chat,
  ChatRoom,
  DetailProfile,
  Follow,
  Home,
  Login,
  Manage,
  MyPage,
  MypageEdit,
  RedirectKakao,
  RedirectNaver,
  Review,
  ReviewDetail,
  ReviewWrite,
  Setprofile,
  Store,
  StoreDetail,
  StoreEdit,
  StoreWrite,
  ReviewSelect,
  Test,
  UserProfile,
  UserFollow,
  SellerSelect,
} from "../pages";

const AuthRoute = () => {
  return (
    <Switch>
      <Route path={["/home", "/"]} exact component={Home} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/chat/:id" exact component={ChatRoom} />
      <Route path="/store" exact component={Store} />
      <Route path="/store/view/:postId" exact component={StoreDetail} />
      <Route path="/store/write" exact component={StoreWrite} />
      <Route path="/store/write/:postId" exact component={StoreEdit} />
      <Route path="/follow" exact component={Follow} />
      <Route path="/review/" exact component={Review} />
      <Route path="/review/view/:reviewId" exact component={ReviewDetail} />
      <Route path="/review/write/select" exact component={ReviewSelect} />
      <Route path="/review/write/:postId" exact component={ReviewWrite} />
      <Route path="/review/edit/:reviewId" exact component={ReviewWrite} />
      <Route path="/test" component={Test} />
      <Route path="/mypage" exact component={MyPage} />
      <Route path="/userprofile/:userId" exact component={UserProfile} />
      <Route path="/userprofile/follow/:userId" exact component={UserFollow} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" exact component={Setprofile} />
      <Route path="/oauth/kakao/callback" component={RedirectKakao} />
      <Route path="/oauth/naver/callback" component={RedirectNaver} />
      <Route path="/mypage/edit" exact component={MypageEdit} />
      <Route path="/mypage/manage" exact component={Manage} />
      <Route path="/profile/detail" exact component={DetailProfile} />
      <Route path="/*" component={Test} />
    </Switch>
  );
};

export default AuthRoute;
