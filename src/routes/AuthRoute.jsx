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
  Test,
  BuyList,
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
      <Route exact path="/review" component={Review} />
      <Route exact path="/review/:reviewId" component={ReviewDetail} />
      <Route exact path="/write" component={ReviewWrite} />
      <Route path="/test" component={Test} />
      <Route path="/mypage" exact component={MyPage} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" exact component={Setprofile} />
      <Route path="/oauth/kakao/callback" component={RedirectKakao} />
      <Route path="/oauth/naver/callback" component={RedirectNaver} />
      <Route path="/mypage/edit" exact component={MypageEdit} />
      <Route path="/mypage/manage" exact component={Manage} />
      <Route path="/mypage/buyList" exact component={BuyList} />
      <Route path="/profile/detail" exact component={DetailProfile} />
      <Route path="/*" component={Test} />
    </Switch>
  );
};

export default AuthRoute;
