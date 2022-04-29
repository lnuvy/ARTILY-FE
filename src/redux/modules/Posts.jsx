import { createSlice } from "@reduxjs/toolkit";

// list: 데이터 담기는곳, isFetching: 데이터를 불러오는중인지, infinityScroll: 구분하는 아이디 등 넣는곳
const initialState = {
  list: [],
  isFetching: false,
  infinityScroll: {},
};

const postsSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    hiDB: (state, action) => {
      console.log("hihi");
    },
  },
});

const { reducer, actions } = postsSlice;
export const { hiDB } = actions;
export default reducer;
