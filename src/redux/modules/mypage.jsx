//마이페이지에서 판매목록을 불러올때 사용될 리덕스입니다. -영경
import { createSlice } from "@reduxjs/toolkit";
import { Apis } from "../../shared/api";

const BASE_URL = "https://rusy7225.shop";

const initialState = {
  list: [],
  nowList: [],
  sellList: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
  done: false,

  // 다른사람 프로필 넣을곳
  userInfo: {},
};
//마이페이지 조회
export const getmyPageDB = () => {
  return function (dispatch, getState, { history }) {
    Apis.getMypageData()
      .then((res) => {
        // console.log("mypage get요청", res);
        dispatch(getmyPageData(res.data));
      })
      .catch((error) => {
        // console.log("마이페이지 조회 실패", error);
        window.alert("마이페이지를 조회하는 데 문제가 발생했습니다!");
      });
  };
};

//다른사람 프로필 조회
export const getUserProfile = (userId) => {
  return function (dispatch, getState, { history }) {
    Apis.getUserProfile(userId)
      .then((res) => {
        // console.log(res.data);
        dispatch(getUserPageData(res.data));
      })
      .catch((error) => {
        // console.log("유저프로필 조회 실패", error);
        // window.alert("마이페이지를 조회하는 데 문제가 발생했습니다!");
      });
  };
};

//판매 목록 조회
export const getMySellListDB = () => {
  return function (dispatch, getState, { history }) {
    Apis.getMyList()
      .then((res) => {
        // console.log("판매목록 조회 :", res);
        // dispatch(selectList());
        const mySell = res.data;
        dispatch(mySellList(mySell));
      })
      .catch((error) => {
        // console.log("판매목록 조회 실패", error);
        window.alert("판매목록을 조회하는 데 문제가 발생했습니다!");
      });
  };
};
//구매 목록 조회
export const getMyBuyListDB = () => {
  return function (dispatch, getState, { history }) {
    Apis.getMyList()
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        // console.log("구매목록 조회 실패", error);
        window.alert("구매목록을 조회하는 데 문제가 발생했습니다!");
      });
  };
};

const postsSlice = createSlice({
  name: "mypage",
  initialState: initialState,
  reducers: {
    getmyPageData: (state, action) => {
      state.list = action.payload;
    },
    getUserPageData: (state, action) => {
      state.userInfo = action.payload;
    },
    // 데이터 하나 특정하기
    getDetail: (state, action) => {
      state.detailData = action.payload;
    },
    selectList: (state, action) => {
      state.nowList = [];
      if (action.payload === "판매목록") {
        state.nowList = state.list.myPosts;
      } else if (action.payload === "리뷰목록") {
        state.nowList = state.list.myReviews;
      } else {
        state.nowList = state.list.myMarkups;
      }
    },
    mySellList: (state, action) => {
      state.sellList = action.payload.myPosts;
    },
  },
});

const { reducer, actions } = postsSlice;
export const {
  getmyPageData,
  getDetail,
  selectList,
  mySellList,
  getUserPageData,
} = actions;
export default reducer;
