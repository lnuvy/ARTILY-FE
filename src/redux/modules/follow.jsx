import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";
import { useSelector } from "react-redux";
import { fromPairs } from "lodash";

const initialState = {
  list: [],
  follower: [],
  userfollow: [],
  userfollower: [],
};
//POST
export const addFollowDB = (followId) => {
  return function (dispatch, getState, { history }) {
    Apis.postAddFollow(followId)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(addmyfollowdata(followId));
        // history.push("/follow");
      })
      .catch((error) => {
        console.log("실패", error);
        // window.alert("문제가 발생했습니다!");
      });
  };
};
//팔로우 취소
export const DeleteFollowDB = (followId) => {
  return function (dispatch, getState, { history }) {
    Apis.postAddFollow(followId)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(addmyfollowdata(followId));
        // history.push("/follow");
      })
      .catch((error) => {
        console.log("팔로우 삭제 실패", error);
      });
  };
};

//팔로우 목록(GET)
export const getFollowDB = () => {
  return function (dispatch, getState, { history }) {
    Apis.getMyFollowlist()
      .then((res) => {
        const followUser = res.data.data;
        console.log("GET 팔로우 :", res);
        dispatch(addmyfollowdata(followUser));
        // history.push("/follow");
      })
      .catch((error) => {
        console.log("follow 목록 조회 실패", error);
      });
  };
};
//팔로워 목록(GET)
export const getFollowerDB = () => {
  return function (dispatch, getState, { history }) {
    Apis.getMyFollowerlist()
      .then((res) => {
        const followerUser = res.data.data;
        console.log("GET 팔로워 :", res);
        console.log(followerUser);
        dispatch(getfollowerdata(followerUser));
        // history.push("/follow");
      })
      .catch((error) => {
        console.log("follower 목록 조회 실패", error);
      });
  };
};

//유저 팔로우 목록(GET)
export const getUserFollowDB = (userId) => {
  return function (dispatch, getState, { history }) {
    Apis.getUserFollowlist(userId)
      .then((res) => {
        const userfollowlist = res.data.data;
        console.log("GET user팔로우 :", res);
        dispatch(getuserfollowdata(userId));
        dispatch(getuserfollowdata(userfollowlist));
        // dispatch(getuserfollowdata(res.data.data));
      })
      .catch((error) => {
        console.log("follow 목록 조회 실패", error);
      });
  };
};

//유저 팔로워 목록(GET)
export const getUserFollowerDB = (userId) => {
  return function (dispatch, getState, { history }) {
    Apis.getUserFollowerlist(userId)
      .then((res) => {
        const userfollowerlist = res.data.data;
        console.log("GET user팔로워 :", res);
        dispatch(getuserfollowerdata(userId));
        dispatch(getuserfollowerdata(userfollowerlist));
      })
      .catch((error) => {
        console.log("follower 목록 조회 실패", error);
      });
  };
};

const postsSlice = createSlice({
  name: "followUser",
  initialState: initialState,
  reducers: {
    addmyfollowdata: (state, action) => {
      state.list = action.payload;
      // state.follower = action.payload;
      console.log("followId: ", state.list); //followId
    },
    getfollowerdata: (state, action) => {
      state.follower = action.payload;
      console.log(state.follower);
    },
    getuserfollowdata: (state, action) => {
      state.userfollow = action.payload;
      console.log(state.userfollow);
    },
    getuserfollowerdata: (state, action) => {
      state.userfollower = action.payload;
      console.log(state.userfollower);
    },
  },
});

const { reducer, actions } = postsSlice;

export const {
  addmyfollowdata,
  getfollowdata,
  getfollowerdata,
  getuserfollowdata,
  getuserfollowerdata,
} = actions;
export default reducer;
