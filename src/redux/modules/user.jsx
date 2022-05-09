import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
// 로컬스토리지 token 작업 임포트
import { getToken, insertToken, removeToken } from "../../shared/token";
import { markupToggle } from "./store";

// const BASE_URL = "http://52.78.183.202";
// const BASE_URL = "http://13.125.83.59";
const BASE_URL = "http://13.124.169.236"; // 5/9

//action
//로그인 체크
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
const EDIT_USER = "EDIT_USER";
// 5/6 한울 마크업 작업
const POSTING_MARKUP = "POSTING_MARKUP";

//action creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logout = createAction(LOG_OUT);
const editUser = createAction(EDIT_USER, () => ({}));

// 5/6 한울 마크업 작업
const postMarkup = createAction(POSTING_MARKUP, (postId, isUp) => ({
  postId,
  isUp,
}));

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
        //최초 로그인일 경우에만 로그인 후 프로필 설정하는 페이지로 이동
        if (ACCESS_TOKEN) {
          history.replace("/");
        }
        history.replace("/profile");
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
//mypage
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
        // document.location.href = "/";
      })
      .catch((error) => {
        console.log("프로필 정보 전송 실패", error);
      });
  };
};

const postMarkupToggle = (postId) => {
  return function (dispatch, getState) {
    const { myMarkup } = getState().user.user;
    // 이미 좋아요가 돼있다면 markup 리스트에 postId를 빼기
    if (myMarkup.find((id) => id === postId)) {
      dispatch(postMarkup(postId, false));
      // 리덕스 내에서 해당 포스팅 숫자 하나 올리기 (이건 store에 있는 액션함수임)
      dispatch(markupToggle({ isUp: false }));
      // 본인 유저정보의 myMarkup 안에 해당 포스트 아이디가 없다면 추가
    } else {
      dispatch(postMarkup(postId, true));
      // 리덕스 내에서 해당 포스팅 숫자 하나 올리기 (이건 store에 있는 액션함수임)
      dispatch(markupToggle({ isUp: true }));
    }
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
    [POSTING_MARKUP]: (state, action) =>
      produce(state, (draft) => {
        // 올려야하면
        if (action.payload.isUp) {
          draft.user.myMarkup.push(action.payload.postId);
        } else {
          let newArr = draft.user.myMarkup.filter(
            (id) => id !== action.payload.postId
          );
          draft.user.myMarkup = newArr;
        }
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
  postMarkupToggle,
  // kakaoLogout,
};
export { actionCreators };
