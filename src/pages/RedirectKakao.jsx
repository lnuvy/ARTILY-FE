import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../redux/modules/user";

const RedirectKakao = () => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(kakaoLogin(code));
  }, []);

  return null;
};

export default RedirectKakao;
