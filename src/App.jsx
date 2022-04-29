import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Chat, Follow, Home, MyPage, NotFound, Review, Store, Test } from "./pages";
import { history } from "./redux/configureStore";
import "./styles/App.css";
import Navigation from "./components/common/Navigation";
import Header from "./components/common/Header";
import ToastMessage from "./components/common/ToastMessage"

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        {/* <Header /> */}
        <Navigation />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/store" exact component={Store} />
          <Route path="/follow" exact component={Follow} />
          <Route path="/review" exact component={Review} />
          <Route path="/mypage" exact component={MyPage} />
          {/* <Route path="/*" component={NotFound} /> */}
          <Route path="/*" component={Test} />
        </Switch>
        {/* <ToastMessage /> */}
      </ConnectedRouter>
    </>
  );
}

export default App;
