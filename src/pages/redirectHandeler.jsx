import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const RedirectHandler = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  console.log(window.location.href);
  console.log(new URL(window.location.href).searchParams.get("code"));
  //async await 가 필요한 이유?
  React.useEffect(() => {
    // dispatch(userActions.kakaoLogin(code));
    dispatch(userActions.naverLogin(code));
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

export default RedirectHandler;
