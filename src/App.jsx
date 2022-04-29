import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Header, Navigation } from "./components";
import {
  Chat,
  Follow,
  Home,
  MyPage,
  NotFound,
  Review,
  Login,
  Location,
  Setprofile,
  Store,
  StoreDetail,
} from "./pages";
import { history } from "./redux/configureStore";
import RedirectHandler from "./pages/redirectHandeler";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "./shared/token";
import { actionCreators as userActions } from "./redux/modules/user";

function App() {
  const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.user.isLogin);
  // console.log(isLogin);

  // useEffect(() => {
  // if (!isLogin) {
  //   const token = getToken();
  //   if (token) {
  //     //토큰이 있으면
  //     dispatch(userActions.getUserInfo(token));
  //     //최초 로그인이면 주소창을 보여주고
  //     //기존 가입자면 홈화면을 보여줘
  //   }
  // }
  // }, [isLogin]);

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header>ARTILY</Header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/follow" exact component={Follow} />
          <Route path="/store" exact component={Store} />
          <Route path="/store/:id" exact component={StoreDetail} />
          <Route path="/review" exact component={Review} />
          {/* <Route path="/test" component={Test} /> */}
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/location" exact component={Location} />
          <Route path="/profile" exact component={Setprofile} />
          <Route
            path="/oauth/kakao/callback"
            component={RedirectHandler}
          ></Route>
          <Route path="/*" component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}
export default App;
