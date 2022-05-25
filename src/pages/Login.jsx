import React from "react";
import { Flex, Button, Wrap, Text } from "../elements";
import styled from "styled-components";
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
      <Wrap textAlign="center" margin="100px 0">
        <img src="/images/Artily.png" />
        <Sub>회원 서비스 이용을 위해 로그인 해주세요!</Sub>
      </Wrap>
      <Kakaobtn>
        <img src="/images/KakaoLogo.png" />
        <button onClick={() => (window.location.href = KAKAO_AUTH_URL)}>
          카카오로 시작하기
        </button>
        {/* <Button
          outline
          bc="white"
          width="100%"
          onClick={() => (window.location.href = NAVER_AUTH_URL)}
        >
          네이버로 시작하기
        </Button> */}
      </Kakaobtn>
    </>
  );
};

const Sub = styled.p`
  color: ${({ theme }) => theme.pallete.gray2};
  font-size: 16px;
  padding-top: 10px;
`;
const Kakaobtn = styled.div`
  position: relative;
  text-align: center;
  padding: 0 16px;
  img {
    position: absolute;
    top: 10px;
    left: 38px;
  }
  button {
    width: 100%;

    border-radius: 8px;
    border: 1px solid #dedede;
    background-color: #fff;
    height: 54px;
    color: #000;
    font-size: 16px;
  }
`;
export default Login;
