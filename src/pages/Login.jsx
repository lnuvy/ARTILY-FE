import React, { useEffect } from "react";
import styled from "styled-components";
// import { IoIosArrowRoundBack } from "react-icons/io";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
import axios from "axios";
// import { insertToken } from "../shared/token";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = () => {
  //카카오 소셜 로그인
  const REST_API_KEY = "8ef6077e99cfc3ea15c25ab21d4c372e"; //내 REST_API_KEY 값
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(userActions.kakaoLogin());
  });

  return (
    <React.Fragment>
      <h2>로그인</h2>
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
        <img
          alt="네이버 소셜 로그인"
          src="../images/naver_social_login.png"
          width="200px"
        ></img>
      </div>
    </React.Fragment>
  );
};

export default Login;
