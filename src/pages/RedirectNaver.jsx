import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { naverLogin } from "../redux/modules/user";

const RedirectNaver = () => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");
  let state = new URL(window.location.href).searchParams.get("state");

  useEffect(() => {
    dispatch(naverLogin(code, state));
  });

  return null;
};

export default RedirectNaver;
