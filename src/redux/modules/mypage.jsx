//마이페이지에서 판매목록을 불러올때 사용될 리덕스입니다. -영경
import { createSlice } from "@reduxjs/toolkit";

import { myStoreDummy } from "../../shared/Dummy";

const initialState = {
  list: [],
  nowList: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
};

export const getmyPostDB = () => {
  return async function (dispatch, getState, { history }) {
    // await axios.get()

    // 더미데이터 리덕스 주입
    dispatch(getmyStoreData(myStoreDummy)); //일단 한번에 가져와
  };
};

// export const getmyPostOne = (postId) => {
//   return async function (dispatch, getState, { history }) {
//     // axios

//     // 더미데이터 임시방편
//     dispatch(getmyStoreData(myStoreDummy));
//     const allList = getState().mystore.list;
//     console.log(allList);
//     const now = allList.find((l) => l.postId === postId);
//     dispatch(go2detail(now));
//   };
// };

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
    selectList: (state, action) => {
      state.nowList = state.list.find((l) => l === action.payload);
    },
  },
});

const { reducer, actions } = postsSlice;
export const { getmyStoreData, go2detail, selectList } = actions;
export default reducer;
