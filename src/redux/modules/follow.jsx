import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";

const initialState = {
  myFollowing: [],
  myFollower: [],
  userfollow: [],
  userfollower: [],
  deletelist: null,
};

// POST 팔로잉 하기
export const addFollowDB = (userData) => {
  return function (dispatch, getState, { history }) {
    Apis.postAddFollow(userData.followId)
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "팔로우 취소") {
          dispatch(deleteFollowing(userData));
        } else {
          dispatch(addFollowing(userData));
        }
      })
      .catch((error) => {
        console.log("addFollowDB 실패", error);
      });

    // history.replace("/follow");
  };
};

// 이거 날림 (delete)

//팔로우 목록(GET)
export const getFollowDB = () => {
  return function (dispatch, getState, { history }) {
    Apis.getMyFollowlist()
      .then((res) => {
        const followUser = res.data.data;
        dispatch(getMyFollowing(followUser));
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

//팔로워 삭제(Delete)
export const deleteFollowerDB = (userId) => {
  return function (dispatch, getState, { history }) {
    Apis.deleteFollower(userId)
      .then((res) => {
        // window.location.reload();
      })
      .catch((error) => {
        console.log("팔로워 삭제 실패", error);
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
    getMyFollowing: (state, action) => {
      state.myFollowing = action.payload;
    },
    getMyFollower: (state, action) => {
      state.myFollower = action.payload;
    },
    //
    addFollowing: (state, action) => {
      state.myFollowing.push(action.payload);
    },
    deleteFollowing: (state, action) => {
      let newArr = state.myFollowing.filter(
        (f) => f.followId !== action.payload.followId
      );
      state.myFollowing = newArr;
    },
    getfollowerdata: (state, action) => {
      state.myFollower = action.payload;
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
  getMyFollowing,
  getMyFollower,
  addFollowing,
  deleteFollowing,
  getfollowdata,
  getfollowerdata,
  getuserfollowdata,
  getuserfollowerdata,
} = actions;
export default reducer;
