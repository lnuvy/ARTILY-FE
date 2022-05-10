//마이페이지에서 판매목록을 불러올때 사용될 리덕스입니다. -영경
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myPageDummy } from "../../shared/Dummy";

const BASE_URL = "http://43.200.8.138";

const initialState = {
  list: [],
  nowList: [],
  buyList: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
};

export const getmyPageDB = (userId) => {
  // return async function (dispatch, getState, { history }) {
  //   // 더미데이터 리덕스 주입
  //   dispatch(getmyPageData(myPageDummy)); //일단 한번에 가져와
  //   console.log(myPageDummy);
  // };
  return function (dispatch, getState) {
    axios({
      method: "get",
      url: `${BASE_URL}/api/profile/:${userId}`,
      // data: userId,
    })
      .then((res) => {
        console.log(res);
        dispatch(getmyPageData(myPageDummy));
      })
      .catch((error) => {
        console.log("마이페이지 조회 실패", error);
        window.alert("마이페이지를 조회하는 데 문제가 발생했습니다!");
      });
  };
};
export const myBuylistDB = (userId) => {
  // return async function (dispatch, getState, { history }) {
  //   // 더미데이터 리덕스 주입
  //   dispatch(getmyPageData(myPageDummy)); //일단 한번에 가져와
  //   console.log(myPageDummy);
  // };
  return function (dispatch, getState) {
    axios({
      method: "get",
      url: `${BASE_URL}/api/profile/:${userId}`,
      // data: userId,
    })
      .then((res) => {
        console.log(res);
        dispatch(getmyPageData(myPageDummy));
      })
      .catch((error) => {
        console.log("마이페이지 조회 실패", error);
        window.alert("마이페이지를 조회하는 데 문제가 발생했습니다!");
      });
  };
};

const postsSlice = createSlice({
  name: "mystore",
  initialState: initialState,
  reducers: {
    getmyPageData: (state, action) => {
      state.list = action.payload;
    },
    // 데이터 하나 특정하기
    getDetail: (state, action) => {
      state.detailData = action.payload;
    },
    selectList: (state, action) => {
      if (action.payload === "판매목록") {
        state.nowList = state.list.myPost;
      } else if (action.payload === "리뷰목록") {
        state.nowList = state.list.myReview;
      } else if (action.payload === "관심목록") {
        state.nowList = state.list.myMarkup;
        // let newArr = state.list.find((l) => l === action.payload);
        // console.log(newArr);
      }
    },
    selectbuyList: (state, action) => {
      state.list = state.list.myBuy;
      console.log(state.list.myBuy);
    },
  },
});

const { reducer, actions } = postsSlice;
export const { getmyPageData, getDetail, selectList, selectbuyList } = actions;
export default reducer;
