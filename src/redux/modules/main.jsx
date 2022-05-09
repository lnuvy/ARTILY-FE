import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// import { homeDummy } from "../../shared/Dummy";
import { Apis } from "../../shared/api";

/*
 * 4/29 한울
 * 홈화면에서 api호출에 맞게 저장할 리덕스가 필요한거같아 새로 만듬
 */

const initialState = {
  // 5/9 변수명 바꿈
  bestPost: [],
  bestWriter: [],
  bestReview: [],
};

export const getHomeDataDB = () => {
  return async function (dispatch, getState, { history }) {
    // console.log(homeDummy);
    // dispatch(getHomeData(homeDummy));

    Apis.getHome()
      .then(function (response) {
        console.log(response);
        dispatch(getHomeData(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
        console.log("실패");
      });
  };
};

const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    getHomeData: (state, action) => {
      const { bestPost, bestReview, bestWriter } = action.payload;

      state.bestPost = bestPost;
      state.bestWriter = bestWriter;
      state.bestReview = bestReview;
    },
  },
});

const { reducer, actions } = mainSlice;
export const { getHomeData } = actions;
export default reducer;
