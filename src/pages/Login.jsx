import React, { useEffect } from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { Text } from "../elements";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
// import NaverLogin from "react-naver-login";
// import "babel-Polyfill";
const Login = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
  const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  // const { naver } = window;
  // const location = useLocation();

  // const initializeNaverLogin = () => {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: NAVER_CLIENT_ID,
  //     callbackUrl: NAVER_CALLBACK_URL,
  //     isPopup: false,
  //     loginButton: { color: "white", type: 1, height: "47" },
  //   });
  //   naverLogin.init();
  // };

  // useEffect(() => {
  //   initializeNaverLogin();
  // }, []);

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=asdf`;
  return (
    <>
      <Text h1>로그인</Text>
      <div>
        {/* 카카오로 로그인 */}
        <a href={KAKAO_AUTH_URL}>
          <img
            alt="카카오 소셜 로그인"
            src="../images/kakao_social_login.png"
            width="200px"
          ></img>
        </a>
        {/* <div id="naverIdLogin"></div> */}
        <a href={NAVER_AUTH_URL}>
          <img
            alt="네이버"
            src="../images/naver_social_login.png"
            // 네이버 소셜로그인 버튼 사이즈 변경함(5.4 영경)
            width="200px"
          ></img>
        </a>
      </div>
    </>
  );
};

export default Login;
