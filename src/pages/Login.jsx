import React, { useEffect } from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { Text, Flex } from "../elements";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
// import NaverLogin from "react-naver-login";
// import "babel-Polyfill";
const Login = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
  const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  // const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=asdf`;
  return (
    <>
      <Flex jc="center" margin="80px 0 10px 0">
        <h2>ARTILY</h2>
      </Flex>
      <Flex jc="center">
        <p>회원 서비스 이용을 위해 로그인 해주세요!</p>
      </Flex>
      <Flex jc="center" margin="100px 0 0 0">
        {/* 카카오로 로그인 */}
        <a href={KAKAO_AUTH_URL}>
          <Kakao>카카오로 시작하기</Kakao>
        </a>
      </Flex>
      <Flex jc="center">
        {/* <div id="naverIdLogin"></div> */}
        <a href={NAVER_AUTH_URL}>
          <Naver>네이버로 시작하기</Naver>
        </a>
      </Flex>
    </>
  );
};
const Kakao = styled.div`
  width: 90vw;
  height: 10vh;
  border: 2px solid #d2d2d2;
  border-radius: 8px;
  font-weight: bold;
  color: #000;
  line-height: 10vh;
  text-align: center;
  margin-bottom: 1em;
`;

const Naver = styled.div`
  width: 90vw;
  height: 10vh;
  border: 2px solid #d2d2d2;
  border-radius: 8px;
  font-weight: bold;
  color: #000;
  line-height: 10vh;
  text-align: center;
`;
export default Login;
