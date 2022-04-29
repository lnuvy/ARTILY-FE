import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
// 로컬스토리지 token 작업 임포트
import { getToken, insertToken, removeToken } from "../../shared/token";
import { size } from "lodash";

//action
//로그인 체크
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";

//action creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

//initialState

const initialState = {
  user: null,
  isLogin: false,
  location: "",
};

//로그인 미들웨어
//인가코드 넘기기
//서버로부터 토큰받기
const kakaoLogin = () => {
  // let code = new URL(window.location.href).searchParams.get("code");
  return async function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      // url: `http://15.164.244.75/api/oauth/kakao/callback?code=${code}`,
    })
      .then((res) => {
        console.log(res); // 토큰이 넘어옴

        const ACCESS_TOKEN = res.data.accessToken;

        localStorage.setItem("token", ACCESS_TOKEN); //local storage에 저장

        document.location.href = "/location"; // 토큰 받았고 로그인됐으니 화면 전환시켜줌(일단 위치설정)
      })
      .catch((err) => {
        console.log("소셜로그인 에러!", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/"); // 로그인 실패하면 메인화면으로 돌려보냄
      });

    // 서버 열리면 이 아래로 다 지워버리면 됩니다!
    //서버 열리기 전 가상 데이터
    // console.log("로그인 성공했다 치고");

    // let fakeResponseData = {
    //   userId: "user123",
    //   nickName: "닉네임",
    //   profileUrl: "",
    //   address: "",
    //   blackList: [],
    // };
    // let fakeResponseToken = "토큰이다!";

    // insertToken("isLogin", fakeResponseToken); //토큰 저장
    // console.log("로컬 스토리지에 토큰 넣음");
    // dispatch(setUser(fakeResponseData));
    // if (fakeResponseData.address == "") {
    //   history.push("/"); //일단 로그인하면 메인으로 보내
    // }
  };
};

const getUserInfo = (token) => {
  return async function (dispatch, getState, { history }) {
    // const config = { Authorization: `Bearer ${token}` };
    // console.log("토큰 헤더로 넘겼다", config);
    // let fakeResposeUser = {
    //   email: "asdf@gmail.com",
    //   nickname: "닉네임",
    //   profileImg: "",
    // };
    // if (getToken()) {
    //   dispatch(getUser("isLogin", fakeResposeUser));
    //   // history.replace("/location");
  };
  // await axios
  //   .get(`${BASE_URL}/user/getuser`, { headers: config })
  //   .then((res) => {
  //     console.log(res);
  //     // getUser(res.data.받아온형식);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     console.log(err.response);
  //   });
};

const locationDB = (si, gu, dong) => {
  return function (dispatch) {
    axios({
      method: "post", //주소정보 보내기
      url: "https://6253d1d889f28cf72b5335ef.mockapi.io/location",
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
        console.log(res);
        document.location.href = "/profile"; //설정이 완료되면 프로필 설정 페이지로 이동
      })
      .catch((error) => {
        console.log("주소 정보 전달 실패", error);
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
        console.log("여기는 GET_USER 리듀서", action);
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
  },
  initialState
);

const actionCreators = {
  // logInDB,
  locationDB,
  getUserInfo,
  kakaoLogin,
  setUser,
};
export { actionCreators };
