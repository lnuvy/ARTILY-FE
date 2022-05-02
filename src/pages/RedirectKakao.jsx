import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const RedirectKakao = () => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
  }, []);

  return (
    <>
      <h1>!!!!!!!!!!!!!!!</h1>
      <h1>!!!!!!!!!!!!!!!</h1>
      <h1>!!!!!!!!!!!!!!!</h1>
      <h1>!!!!!!!!!!!!!!!</h1>
      <h1>!!!!!!!!!!!!!!!</h1>
      <div>{code}</div>
    </>
  );
};

export default RedirectKakao;
