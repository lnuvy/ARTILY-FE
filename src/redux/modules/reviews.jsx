import { createSlice } from "@reduxjs/toolkit";

import { Apis } from "../../shared/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
/*
 * @ 민경
 *
 */
const MySwal = withReactContent(Swal);
const initialState = {
  list: null,
  filterList: null,
  myReviewLike: null,
  myreviewLikeList2: [],
  reviewData: null,
  buyList: null,
  isFetching: false,
  infinityScroll: {},
  detailData: {
    buyer: [],
    defferents: [],
    myLike: "-",
  },
};

export const getReviewDB = (pageNumber) => {
  return async function (dispatch, getState, { history }) {
    // const pageHandler = {
    //   page: 1,
    //   limit: 6,
    // };
    Apis.getReview(pageNumber)
      .then(function (response) {
        dispatch(getReviewData(response.data.reviews));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getMyBuyDB = () => {
  return async function (dispatch, getState, { history }) {
    Apis.getMyBuy()
      .then(function (response) {
        // console.log(response);
        dispatch(getBuyList(response.data.myBuy));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getReviewOne = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    // console.log(reviewId);
    Apis.getReviewDetail(reviewId)
      .then(function (response) {
        dispatch(getNowReview(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const postReviewDB = (postID, contents) => {
  return async function (dispatch, getState, { history }) {
    console.log("======postReviewDB");
    Apis.postReview(postID, contents)
      .then(function (response) {
        console.log(response);
        MySwal.fire({
          icon: "success",
          text: "리뷰 작성이 완료되었습니다!",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/review");
          }
        });
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };
};

export const editReviewDB = (postId, contents) => {
  // console.log(postId);
  // console.log(contents);
  return async function (dispatch, getState, { history }) {
    Apis.editReview(postId, contents)
      .then(function (response) {
        console.log(response);
        MySwal.fire({
          icon: "success",
          text: "리뷰 수정이 완료되었습니다!",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/review");
          }
        });
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
        // console.log(response);
        MySwal.fire({
          icon: "error",
          text: "정상적으로 삭제되었습니다!",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/review");
          }
        });
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
        console.log("좋아요 누름", response);
        // dispatch(getMyLike(response.data.totalLike));
        // dispatch(getReviewOne(reviewId));
        history.go(0);
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };
};

export const likeReviewListDB = (reviewId) => {
  return async function (dispatch, getState, { history }) {
    Apis.getLikeReview()
      .then((res) => {
        if (reviewId) {
          const likeList = res.data.likeList;
          likeList.map((v, i) => {
            if (reviewId === v) {
              // console.log(v);
              dispatch(myReviewLike(true));
              return;
            } else {
              // console.log("false");
              dispatch(myReviewLike(false));
              return;
            }
          });
        }
        // console.log(res.data.likeList);
        dispatch(myreviewLikeList(res.data.likeList));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
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
      // console.log(state.list);
    },
    getBuyList: (state, action) => {
      state.buyList = action.payload;
    },
    getNowReview: (state, action) => {
      // console.log(action.payload);
      state.detailData.buyer = action.payload.buyer;
      state.detailData.defferentInfo = action.payload.defferentInfo;
    },
    getMyLike: (state, action) => {
      state.detailData.myLike = action.payload;
    },
    myReviewLike: (state, action) => {
      state.myReviewLike = action.payload;
    },
    myreviewLikeList: (state, action) => {
      state.myreviewLikeList2 = action.payload;
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
        // console.log(action.payload);
        state.filterList = state.list;
        return;
      }
      state.filterList = state.list?.filter(
        (v) => v.seller?.category === action.payload
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
  myReviewLike,
  myreviewLikeList,
} = actions;
export default reducer;
