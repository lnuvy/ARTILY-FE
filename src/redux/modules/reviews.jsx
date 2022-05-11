import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";

/*
 * @ 민경
 *
 */

const initialState = {
  list: [],
  filterList: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
  detailSeller: null,
  detailSellerAnother: null,
  reviewData: null,
};

export const getReviewDB = () => {
  return async function (dispatch, getState, { history }) {
    // await axios.get()
    console.log("---getReviewDB");
    // 더미데이터 리덕스 주입

    const pageHandler = {
      page: 1,
      limit: 6,
    };
    Apis.getReview(pageHandler)
      .then(function (response) {
        console.log(response);
        dispatch(getReviewData(response.data));
      })
      .catch(function (error) {
        console.log(error);
        console.log("실패");
      });
  };
};

export const getReviewOne = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    // axios

    console.log(reviewId);

    Apis.getReviewDetail("4208ef179b5d")
      .then(function (response) {
        console.log(response.data.buyer);
        console.log(response.data.defferent);
        dispatch(getNowReview(response.data.buyer));
      })
      .catch(function (error) {
        console.log(error);
        console.log("실패");
      });

    // const now = allList.find((l) => l.reviewId === Number(reviewId));
    // console.log(now);
    // dispatch(getNowReview(now));
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
    // 카테고리 필터 이름변경
    filteringReviewData: (state, action) => {
      if (action.payload === "전체") {
        state.filterList = state.list;
        return;
      }
      state.filterList = state.list.filter(
        (post) => post.category === action.payload
      );
    },
  },
});

const { reducer, actions } = reviewSlice;
export const { getReviewData, go2detail, getNowReview, filteringReviewData } =
  actions;
export default reducer;
