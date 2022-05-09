//마이페이지에서 판매목록을 불러올때 사용될 리덕스입니다. -영경
import { createSlice } from "@reduxjs/toolkit";

import { myPageDummy } from "../../shared/Dummy";

const initialState = {
  list: [],
  nowList: [],
  buyList: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
};

export const getmyPageDB = () => {
  return async function (dispatch, getState, { history }) {
    // 더미데이터 리덕스 주입
    dispatch(getmyPageData(myPageDummy)); //일단 한번에 가져와
    console.log(myPageDummy);
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
      } else if (action.payload === "구매목록") {
        state.nowList = state.list.myBuy;
      }
      // let newArr = state.list.find((l) => l === action.payload);
      // console.log(newArr);
    },
    selectbuyList: (state, action) => {
      state.buyList = state.list.myBuy;
      console.log(state.list.myBuy);
    },
  },
});

const { reducer, actions } = postsSlice;
export const { getmyPageData, getDetail, selectList, selectbuyList } = actions;
export default reducer;
