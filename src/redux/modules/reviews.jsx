import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";

/*
 * @ 민경
 *
 */

const initialState = {
  //  Reveiw.js
  list: null,
  filterList: null,
  // ReviewDetail.js
  detailData: {
    buyer: [],
    defferents: [],
    myLike: "-",
  },

  reviewData: null,
  buyList: null,
  isFetching: false,
  infinityScroll: {},
};

export const getReviewDB = (pageNumber) => {
  return async function (dispatch, getState, { history }) {
    // const pageHandler = {
    //   page: 1,
    //   limit: 6,
    // };
    Apis.getReview(pageNumber)
      .then(function (response) {
        console.log(response);
        dispatch(getReviewData(response.data.reviews));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getReviewOne = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    Apis.getReviewDetail(reviewId)
      .then(function (response) {
        console.log(response);
        dispatch(getNowReview(response.data));
        // dispatch(getSellItem(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const postReviewDB = (postID, contents) => {
  return async function (dispatch, getState, { history }) {
    console.log("hi");
    Apis.postReview(postID, contents)
      .then(function (response) {
        console.log(response);
        history.push("/review");
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };
};

export const editReviewDB = (reviewId, contents) => {
  return async function (dispatch, getState, { history }) {
    Apis.postReview(reviewId, contents)
      .then(function (response) {
        console.log(response);
        alert("수정되었습니다");
        history.push("/review");
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };
};

export const deleteReviewDB = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    Apis.deleteReview(reviewId)
      .then(function (response) {
        console.log(response);
        alert("삭제되었습니다");
        history.push("/review");
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };
};

export const likeReviewDB = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    Apis.likeReview(reviewId)
      .then(function (response) {
        console.log(response);
        dispatch(getMyLike(response.data.totalLike));
        dispatch(getReviewOne(reviewId));
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };
};

const reviewSlice = createSlice({
  name: "reivew",
  initialState: initialState,
  reducers: {
    getReviewData: (state, action) => {
      state.list = action.payload;
      state.filterList = action.payload;
      console.log(state.list);
    },
    getBuyList: (state, action) => {
      state.buyList = action.payload;
    },
    getNowReview: (state, action) => {
      console.log(action.payload);
      state.detailData.buyer = action.payload.buyer;
      state.detailData.defferents = action.payload.defferents;
    },
    getMyLike: (state, action) => {
      state.detailData.myLike = action.payload;
    },
    getSellItem: (state, action) => {
      function checkSellItem(element) {
        if (element.postId === action.payload.buyer.seller.postId) {
          return true;
        }
      }
      state.reviewData.sellItemInfo =
        action.payload.defferent.find(checkSellItem);
    },
    // 데이터 하나 특정하기
    go2detail: (state, action) => {
      state.detailData = action.payload;
    },
    // 카테고리 필터 이름변경
    filteringReviewData: (state, action) => {
      if (action.payload === "전체") {
        console.log(action.payload);
        state.filterList = state.list;
        return;
      }
      state.filterList = state.list.filter(
        (v) => v.seller.category === action.payload
      );
    },
  },
});

const { reducer, actions } = reviewSlice;
export const {
  getReviewData,
  go2detail,
  getNowReview,
  filteringReviewData,
  getBuyList,
  getMyLike,
  getSellItem,
} = actions;
export default reducer;
