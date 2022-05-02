import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const RedirectNaver = () => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");

  useEffect(() => {
    dispatch(userActions.naverLogin(code, state));
  });

  return null;
};

export default RedirectNaver;
