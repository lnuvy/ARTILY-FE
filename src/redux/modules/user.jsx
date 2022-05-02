import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
// 로컬스토리지 token 작업 임포트
import { getToken, insertToken, removeToken } from "../../shared/token";
import { size } from "lodash";
import { useParams } from "react-router-dom";

//action
//로그인 체크
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const RANDOM_NICK = "RANDOM_NICK";

//action creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const randomNick = createAction(RANDOM_NICK, (user) => user);

//initialState

const initialState = {
  user: null,
  isLogin: false,
  location: "",
  randomNick: null,
};

// 로그인 미들웨어
// 인가코드 넘기기
// 서버로부터 토큰받기
//카카오로그인 middle
const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "GET",
      url: `http://52.78.183.202/oauth/kakao/callback?code=${code}`,
    })
      .then((res) => {
        console.log(res.data); // 토큰이 넘어옴

        const { token, nickname, profileUrl, provider, userId } = res.data.user;
        const ACCESS_TOKEN = token;

        const user = {
          //서버 DB에 담긴 유저정보 가져오자
          userId,
          nickname,
          profileUrl,
          provider,
          // profileUrl: {},
        };
        dispatch(setUser(user));
        localStorage.setItem("token", ACCESS_TOKEN); //local storage에 저장
        history.replace("/regionset"); // 토큰 받았고 로그인됐으니 화면 전환시켜줌(일단 위치설정)
      })
      .catch((err) => {
        console.log("소셜로그인 에러!", err);
        console.log(err.response);
        history.replace("/login"); // 로그인 실패하면 메인화면으로 돌려보냄
      });
  };
};

const getUserInfo = () => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    console.log(config);
    await axios
      .get(`http://52.78.183.202/user/getuser`, { headers: config })
      .then((res) => {
        console.log(res);
        dispatch(getUser(res.data));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        // 임시방편
        // const hanul = {
        //   nickname: "이한울",
        //   profileUrl:
        //     "http://k.kakaocdn.net/dn/blXfTb/btq5FhvAxNd/S37fBUxE0CUskeQNo4mA4K/img_640x640.jpg",
        //   provider: "kakao",
        //   userId: "2222423044",
        // };
        // dispatch(getUser(hanul));
      });
  };
};
const naverLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "GET",
      url: `http://52.78.183.202/oauth/naver/callback?code=${code}`,
    })
      .then((res) => {
        console.log(res.data); // 토큰이 넘어옴
        // const { token, nickname, provider, userId } = res.data.user;
        // const ACCESS_TOKEN = token;

        // const user = {

        // userId,
        // nickname,
        // provider,
        // profileUrl: {},
        // };
        // dispatch(setUser(user));
        // localStorage.setItem("token", ACCESS_TOKEN);
        // history.replace("/regionset");
      })
      .catch((err) => {
        console.log("소셜로그인 에러!", err);
        console.log(err.response);
        history.replace("/login");
      });
  };
};

//실시간 위치 정보
const locationDB = (si, gu, dong) => {
  return function (dispatch) {
    axios({
      method: "post", //주소정보 보내기
      url: "https://6253d1d889f28cf72b5335ef.mockapi.io/location",
      // url: `http://54.180.96.227/login`,
      headers: {
        "Content-Type": `application/json`,
      },
      data: {
        userSi: si,
        userGu: gu,
        userDong: dong,
      },
    })
      .then((res) => {
        console.log("DB에 저장 완료");
        console.log(res);
        document.location.href = "/profile"; //설정이 완료되면 프로필 설정 페이지로 이동
      })
      .catch((error) => {
        console.log("주소 정보 전달 실패", error);
      });
  };
};

const RandomNickDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get("서버주소", {})
      .then((res) => {
        dispatch(randomNick(res.data.nick));
      })
      .catch((error) => {
        window.alert("닉네임 가져오기 실패", error);
        console.log("닉네임 가져오기 실패", error);
      });
  };
};
//리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
  },
  initialState
);

const actionCreators = {
  locationDB,
  kakaoLogin,
  naverLogin,
  getUserInfo,
  setUser,
  getUser,
  RandomNickDB,
};
export { actionCreators };
