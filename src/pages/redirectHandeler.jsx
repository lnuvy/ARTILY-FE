import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
// import Spinner from "./Spinner";

const RedirectHandler = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  //async await 가 필요한 이유?
  React.useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
  }, []);

  return;
};

export default RedirectHandler;
