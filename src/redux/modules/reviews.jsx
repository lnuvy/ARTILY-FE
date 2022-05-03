import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { homeDummy } from "../../shared/Dummy";

/*
 * 4/29 한울
 * 민경님꺼 머지했을때 홈에서 터져서 더미데이터 넣음
 */

const initialState = {
  list: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
};

export const getReview = () => {
  return async function (dispatch, getState, { history }) {
    // await axios.get()

    // 더미데이터 리덕스 주입
    console.log(homeDummy[2]["후기"]);
    dispatch(getReviewData(homeDummy[2]["후기"]));
  };
};

export const getReviewOne = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    // axios
    console.log(Number(reviewId));
    const allList = homeDummy[2]["후기"];
    console.log(allList);

    const now = allList.find((l) => l.reviewId === Number(reviewId));
    console.log(now);
    dispatch(getNowReview(now));
  };
};

const reviewSlice = createSlice({
  name: "reivew",
  initialState: initialState,
  reducers: {
    getReviewData: (state, action) => {
      state.list = action.payload;
    },
    getNowReview: (state, action) => {
      state.reviewData = action.payload;
    },
    // 데이터 하나 특정하기
    go2detail: (state, action) => {
      state.detailData = action.payload;
    },
  },
});

const { reducer, actions } = reviewSlice;
export const { getReviewData, go2detail, getNowReview } = actions;
export default reducer;
