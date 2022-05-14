import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";

const initialState = {
  follow: [], //유저가 팔로잉한 사람 목록
  follower: [], //유저를 팔로우한 사람 목록
};
//follow 목록 조회
export const addFollowDB = (followId) => {
  return function (dispatch, getState, { history }) {
    Apis.getMypageData(followId)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(getmyfollowdata(followId));
        // history.push("/follow");
      })
      .catch((error) => {
        console.log("follow 목록 조회 실패", error);
        window.alert("follow 목록을 조회하는 데 문제가 발생했습니다!");
      });
  };
};

const postsSlice = createSlice({
  name: "followUser",
  initialState: initialState,
  reducers: {
    getmyfollowdata: (state, action) => {
      state.follow = action.payload;
      console.log(state.follow); //followId
    },
  },
});

const { reducer, actions } = postsSlice;

export const { getmyfollowdata } = actions;
export default reducer;
