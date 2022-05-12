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
  buyList: null,
};

export const getReviewDB = () => {
  return async function (dispatch, getState, { history }) {
    // await axios.get()
    // 더미데이터 리덕스 주입

    const pageHandler = {
      page: 1,
      limit: 6,
    };
    Apis.getReview(pageHandler)
      .then(function (response) {
        dispatch(getReviewData(response.data.review));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getReviewOne = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    // axios
    Apis.getReviewDetail(reviewId)
      .then(function (response) {
        console.log(response.data);
        dispatch(getNowReview(response.data));
        // const sellItem = response.data.reviewData.defferent.filter(
        //   (v) => v.postId === current.reviewData.buyer.seller.postId && v.postId
        // );
        // dispatch();
      })
      .catch(function (error) {
        console.error(error);
      });

    // const now = allList.find((l) => l.reviewId === Number(reviewId));
    // console.log(now);
    // dispatch(getNowReview(now));
  };
};

export const postReviewDB = (postID, contents) => {
  return async function (dispatch, getState, { history }) {
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

const reviewSlice = createSlice({
  name: "reivew",
  initialState: initialState,
  reducers: {
    getReviewData: (state, action) => {
      state.list = action.payload;
    },
    getNowReview: (state, action) => {
      console.log(action.payload.defferent);
      state.reviewData = action.payload;
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
        state.filterList = state.list;
        return;
      }

      if (state.list.length > 0) {
        state.filterList = state.list.filter(
          (post) => post.category === action.payload
        );
      }
    },
  },
});

const { reducer, actions } = reviewSlice;
export const { getReviewData, go2detail, getNowReview, filteringReviewData } =
  actions;
export default reducer;
