import { createSlice } from "@reduxjs/toolkit";
import { Apis } from "../../shared/api";

import { getToken, insertToken } from "../../shared/token";

// 찜하기
import { markupToggle } from "./store";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { authAlert } from "../../shared/commonAlert";
import { clearFollow } from "./follow";

const MySwal = withReactContent(Swal);

const initialState = {
  // user: {
  //   address: null,
  //   blacklist: [],
  //   follow: [],
  //   followCnt: 0,
  //   follower: [],
  //   followerCnt: 0,
  //   introduce: null,
  //   myBuy: [],
  //   myMarkup: [],
  //   myPost: [],
  //   myReview: [],
  //   nickname: null,
  //   profileImage: null,
  //   provider: null,
  //   role: false,
  //   snsUrl: [],
  //   type: null,
  //   userId: null,
  // },
  user: null,
  isLogin: false,
};

export const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    Apis.getKakaoCode(code)
      .then((res) => {
        // console.log("로그인 직후 데이터모양", res.data);

        const {
          token,
          nickname,
          profileImage,
          provider,
          userId,
          type,
          introduce,
        } = res.data.user;

        const user = {
          userId,
          nickname,
          profileImage,
          provider,
          type,
          introduce,
        };
        insertToken(token);
        dispatch(setUser(user));
        history.replace("/");
      })
      .catch((err) => {
        // console.log("카카오로그인", err);
        console.log(err.response);
      });
  };
};

export const naverLogin = (code, state) => {
  return async function (dispatch, getState, { history }) {
    Apis.getNaverCode(code, state)
      .then((res) => {
        // console.log("네이버로그인 직후 데이터모양", res.data);
        const {
          token,
          nickname,
          profileImage,
          provider,
          userId,
          type,
          introduce,
        } = res.data.user;

        const user = {
          //서버 DB에 담긴 유저정보 가져오자
          userId,
          nickname,
          profileImage,
          provider,
          type,
          introduce,
        };
        dispatch(setUser(user));
        insertToken(token);
        history.push("/");
      })
      .catch((err) => {
        // console.log("네이버로그인 에러", err);
        console.log(err.response);
      });
  };
};

export const getUserInfo = () => {
  return async function (dispatch, getState, { history }) {
    Apis.getUser()
      .then((res) => {
        // console.log("getUser 데이터모양", res);
        const { user } = res.data;
        dispatch(getUser(user));
        // if (user.type === "new") {
        //   //신규 회원이면
        //   history.replace("/profile");
        // } else {
        //   //기존 회원이면
        //   history.replace("/");
        // }
      })
      .catch((err) => {
        // console.log("getUser 에러", err);
        console.log(err.response);
      });
  };
};

// 회원가입 후 프로필 설정
// 프로필사진, 닉네임 필수 수집
export const setProfileDB = (formData, goDetail = null) => {
  return function (dispatch, getState, { history }) {
    Apis.patchProfile(formData)
      .then((res) => {
        // console.log("setProfileDB 데이터모양", res);
        if (goDetail) {
          MySwal.fire({
            icon: "check",
            title: "닉네임 설정 완료",
            text: "더 자세한 프로필을 작성하시겠어요?",
            showDenyButton: true,
            confirmButtonText: "네",
            denyButtonText: `아니오`,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/profile/detail");
            } else {
              MySwal.fire({
                icon: "success",
                text: "프로필 설정이 완료되었습니다!",
              });
              history.replace("/");
            }
          });
        } else {
          MySwal.fire({
            icon: "success",
            text: "프로필 설정이 완료되었습니다!",
          });
          history.push("/home");
        }
      })
      .catch((error) => {
        // console.log("프로필 정보 전송 실패", error);
        MySwal.fire({
          icon: "error",
          text: "프로필 저장에 실패했습니다!",
        });
        history.replace("/profile");
      });
  };
};

export const editProfileDB = (formData) => {
  return function (dispatch, getState, { history }) {
    Apis.patchEditProfile(formData)
      .then((res) => {
        MySwal.fire({
          icon: "success",
          text: "프로필 수정이 완료되었습니다.",
        }).then((result) => {
          history.push("/mypage");
        });
      })
      .catch((error) => {
        window.alert("프로필 수정 정보 저장에 문제가 발생했습니다!");
      });
  };
};

export const changeAddressDB = (address) => {
  return function (dispatch, getState) {
    const formData = new FormData();
    formData.append("address", address);

    Apis.patchEditProfile(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

export const postMarkupToggle = (postId) => {
  return function (dispatch, getState, { history }) {
    Apis.postMarkUp(postId)
      .then((res) => {
        console.log(res);

        // const { myMarkup } = getState().user.user;
        // // 이미 좋아요가 돼있다면 markup 리스트에 postId를 빼기
        // if (myMarkup.find((id) => id === postId)) {
        //   dispatch(postMarkup({ postId, isUp: false }));
        //   // 리덕스 내에서 해당 포스팅 숫자 하나 올리기 (이건 store에 있는 액션함수임)
        //   dispatch(markupToggle({ isUp: false }));
        //   // 본인 유저정보의 myMarkup 안에 해당 포스트 아이디가 없다면 추가
        // } else {
        //   dispatch(postMarkup({ postId, isUp: true }));
        //   // 리덕스 내에서 해당 포스팅 숫자 하나 올리기 (이건 store에 있는 액션함수임)
        //   dispatch
        // }
      })
      .catch(async (err) => {
        // console.log("마크업 에러", err);
        console.log(err.response);
        // 401 에러일때 띄우기
        if (err.response.status === 401) {
          const result = await authAlert(err.response.data.errorMessage);
          if (result) {
            history.push("/login");
          }
        }
      });
  };
};

export const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(userLogout());
    dispatch(clearFollow());
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },

    // 데이터 하나 특정하기
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    editUser: (state, action) => {},
    // 카테고리 필터 이름변경
    userLogout: (state) => {
      // console.log("액션 찍힘 ?");
      state.user = null;
      state.isLogin = false;
    },

    // 판매글 찜했을때 유저 리덕스 적용하기
    postMarkup: (state, action) => {
      // 찜 했을때
      if (action.payload.isUp) {
        state.user.myMarkup.push(action.payload.postId);
        // 찜 해제할때
      } else {
        let newArr = state.user.myMarkup.filter(
          (id) => id !== action.payload.postId
        );
        state.user.myMarkup = newArr;
      }
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser, getUser, editUser, userLogout, postMarkup } = actions;
export default reducer;
