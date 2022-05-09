import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
// 로컬스토리지 token 작업 임포트
import { getToken, insertToken, removeToken } from "../../shared/token";

const BASE_URL = "http://13.124.169.236";

//action
//로그인 체크
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
const EDIT_USER = "EDIT_USER";

//action creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logout = createAction(LOG_OUT);
const editUser = createAction(EDIT_USER, (formData) => ({ formData }));

//initialState

const initialState = {
  user: null,
  isLogin: false,
  location: "",
  address: "",
};

// 로그인 미들웨어
// 인가코드 넘기기
// 서버로부터 토큰받기
const kakaoLogin = (code) => {
  // let code = new URL(window.location.href).searchParams.get("code");
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "GET",
      url: `${BASE_URL}/oauth/kakao/callback?code=${code}`,
    })
      .then((res) => {
        console.log(res.data); // 토큰이 넘어옴

        const { token, nickname, profileImage, provider, userId, address } =
          res.data.user;
        const ACCESS_TOKEN = token;

        const user = {
          //서버 DB에 담긴 유저정보 가져오자
          userId,
          nickname,
          profileImage,
          provider,
          address,
        };
        dispatch(setUser(user));
        insertToken(ACCESS_TOKEN); //local storage에 저장
        // 최초 로그인일 경우에만 로그인 후 프로필 설정하는 페이지로 이동
        if (res.data.new) {
          //신규 회원이면
          history.replace("/profile");
        }
        //기존 회원이면
        history.push("/");
      })
      .catch((err) => {
        console.log("소셜로그인 에러!", err);
        console.log(err.response);
        history.replace("/login");
      });
  };
};

const naverLogin = (code, state) => {
  return async function (dispatch, getState, { history }) {
    axios
      .get(`${BASE_URL}/oauth/naver/callback?code=${code}&state=${state}`)
      .then((res) => {
        console.log(res);
        const { token, nickname, profileImage, provider, userId } =
          res.data.user;
        const ACCESS_TOKEN = token;

        const user = {
          //서버 DB에 담긴 유저정보 가져오자
          userId,
          nickname,
          profileImage,
          provider,
        };
        dispatch(setUser(user));
        insertToken(ACCESS_TOKEN); //local storage에 저장
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

const getUserInfo = () => {
  return async function (dispatch, getState, { history }) {
    const config = { Authorization: `Bearer ${getToken()}` };
    await axios
      .get(`${BASE_URL}/api/user/getuser`, { headers: config })
      .then((res) => {
        console.log("profileImage?", res.data);
        const { user } = res.data;
        dispatch(getUser(user));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

const locationDB = (si, gu, dong) => {
  return function (dispatch) {
    axios({
      method: "post", //주소정보 보내기
      url: "https://6253d1d889f28cf72b5335ef.mockapi.io/location",
      // url: `http://52.78.183.202/api/post`,
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
        // document.location.href = "/"; //설정이 완료되면 프로필 설정 페이지로 이동
      })
      .catch((error) => {
        console.log("주소 정보 전달 실패", error);
      });
  };
};

//로그인 후 프로필 설정
//프로필사진, 닉네임 필수 수집
const setProfileDB = (formData) => {
  return function (dispatch, getState) {
    axios({
      method: "patch",
      url: `${BASE_URL}/api/profile`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(editUser(formData));
        document.location.href = "/"; //일단 홈으로
      })
      .catch((error) => {
        console.log("프로필 정보 전송 실패", error);
        window.alert("프로필 저장에 문제가 발생했습니다!");
      });
  };
};
//마이페이지 프로필 수정
//mypage
const editProfileDB = (formData) => {
  return function (dispatch, getState) {
    axios({
      method: "patch",
      url: `${BASE_URL}/api/profile/update`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(editUser(formData));
        document.location.href = "/mypage";
      })
      .catch((error) => {
        console.log("프로필 수정 정보 전달 실패", error);
        window.alert("프로필 수정 정보 저장에 문제가 발생했습니다!");
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
    [LOG_OUT]: (state) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.isLogin = false;
        removeToken();
      }),
  },
  initialState
);

const actionCreators = {
  locationDB,
  kakaoLogin,
  naverLogin,
  getUserInfo,
  getUser,
  setUser,
  logout,
  setProfileDB,
  editProfileDB,
  // kakaoLogout,
};
export { actionCreators };
