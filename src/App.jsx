import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Chat, Follow, Home, MyPage, NotFound, Review } from "./pages";
import { history } from "./redux/configureStore";
import "./styles/App.css";
import Navigation from "./components/common/Navigation";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/follow" exact component={Follow} />
          <Route path="/review" exact component={Review} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </>
  );
}

export default App;
