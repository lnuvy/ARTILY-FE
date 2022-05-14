import React from "react";
import { Flex, Button, Wrap } from "../elements";

const Login = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
  const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  // const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=asdf`;

  const local = process.env.REACT_APP_LOCAL_KAKAO_REDIRECT_URL;
  const localKakao = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${local}&response_type=code`;
  return (
    <>
      <Flex jc="center" margin="80px 0 10px 0">
        <h2>ARTILY</h2>
      </Flex>
      <Flex jc="center">
        <p>회원 서비스 이용을 위해 로그인 해주세요!</p>
      </Flex>
      <Wrap jc="center" margin="100px 0 0 0" padding="0 16px" width="100%">
        <Button
          outline
          bc="white"
          width="100%"
          margin="0 0 16px"
          onClick={() => (window.location.href = KAKAO_AUTH_URL)}
        >
          카카오로 시작하기
        </Button>
        {/* <Button
          outline
          bc="white"
          width="100%"
          margin="0 0 16px"
          onClick={() => (window.location.href = localKakao)}
        >
          카카오로 시작하기
        </Button> */}
        <Button
          outline
          bc="white"
          width="100%"
          onClick={() => (window.location.href = NAVER_AUTH_URL)}
        >
          네이버로 시작하기
        </Button>
      </Wrap>
    </>
  );
};

export default Login;
