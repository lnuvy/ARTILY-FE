import React, { useEffect } from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { Text } from "../elements";
import styled from "styled-components";
// import NaverLogin from "react-naver-login";
// import "babel-Polyfill";
const Login = () => {
  //카카오 소셜 로그인
  // const REST_API_KEY = "8ef6077e99cfc3ea15c25ab21d4c372e"; //내 REST_API_KEY 값
  // const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
  const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;

  // console.log(KAKAO_REST_API_KEY);
  // console.log(KAKAO_REDIRECT_URI);
  // console.log(process.env.REACT_APP_아무거나);

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
  // const dispatch = useDispatch();

  // 네이버 소셜 로그인
  //여러 방법 시도해봤는데 일단 주석 걸어뒀습니다
  // const NAVER_CLIENT_Id = process.env.REACT_APP_NAVER_CLIENT_ID;
  // const NAVER_CALLBACK_URL = process.env.REACT_APP_REDIRECT_URI;
  // const STATE_STRING = "abcde";
  // const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_Id}&state=${STATE_STRING}&redirect_uri=${NAVER_CALLBACK_URL}`;

  // console.log(NAVER_CLIENT_Id);
  // console.log(NAVER_CALLBACK_URL);
  const NaverLogin = () => {
    const { naver } = window;

    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_REDIRECT_URI,

      loginButton: {
        color: "green",
        type: 3,
        height: 47,
      },
    });

    naverLogin.init();
  };

  useEffect(() => {
    NaverLogin();
  }, []);

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
        {/* 네이버로 로그인 */}
        <div className="grid-naver" id="naverIdLogin"></div>
        {/* 카카오와 같은 방식으로 해봤을때 사용한 네이버 소셜로그인 버튼입니다 */}
        {/* <a href={NAVER_AUTH_URL}>
          <img
            alt="네이버 소셜 로그인"
            src="../images/naver_social_login.png"
            width="200px"
          ></img>
        </a> */}
      </div>
    </>
  );
};

export default Login;
