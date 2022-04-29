import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { storeDummy } from "../../shared/Dummy";

/*
 * 4/29 한울
 * 상세페이지로 넘어갈때 리덕스에 해당 데이터만 넣어서 StoreDetail 에서 가져오는 식으로 진행했습니다
 */

// list: 데이터 담기는곳, isFetching: 데이터를 불러오는중인지, infinityScroll: 구분하는 아이디 등 넣는곳
const initialState = {
  list: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
};

export const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    // await axios.get()

    // 더미데이터 리덕스 주입
    console.log(storeDummy);
    dispatch(getStoreData(storeDummy));
  };
};

const postsSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    getHomeData: (state, action) => {},
    getStoreData: (state, action) => {
      state.list = action.payload;
    },
    // 데이터 하나 특정하기
    go2detail: (state, action) => {
      state.detailData = action.payload;
    },
  },
});

const { reducer, actions } = postsSlice;
export const { getStoreData, go2detail } = actions;
export default reducer;
