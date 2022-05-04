//마이페이지에서 목록들을 불러올때 사용될 리덕스입니다. -영경
import { createSlice } from "@reduxjs/toolkit";

import { myStoreDummy } from "../../shared/Dummy";

const initialState = {
  list: [],
  categoryList: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
};

export const getmyPostDB = () => {
  return async function (dispatch, getState, { history }) {
    // await axios.get()

    // 더미데이터 리덕스 주입
    dispatch(getmyStoreData(myStoreDummy));
  };
};

export const getmyPostOne = (postId) => {
  return async function (dispatch, getState, { history }) {
    // axios

    // 더미데이터 임시방편
    dispatch(getmyStoreData(myStoreDummy));
    const allList = getState().mystore.list;
    console.log(allList);
    const now = allList.find((l) => l.postId === postId);
    dispatch(go2detail(now));
  };
};

const postsSlice = createSlice({
  name: "mystore",
  initialState: initialState,
  reducers: {
    getmyStoreData: (state, action) => {
      state.list = action.payload;
    },
    // 데이터 하나 특정하기
    go2detail: (state, action) => {
      state.detailData = action.payload;
    },
    categoryList: (state, action) => {
      state.categoryList = state.list.filter(
        (post) => post.category === action.payload
      );
    },
  },
});

const { reducer, actions } = postsSlice;
export const { getmyStoreData, go2detail, categoryList } = actions;
export default reducer;
