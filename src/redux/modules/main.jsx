import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { homeDummy } from "../../shared/Dummy";
import { Apis } from "../../shared/api";

/*
 * 4/29 한울
 * 홈화면에서 api호출에 맞게 저장할 리덕스가 필요한거같아 새로 만듬
 */

const initialState = {
  bestStore: [],
  recommendArtist: [],
  bestReview: [],
};

export const getHomeDataDB = () => {
  return async function (dispatch, getState, { history }) {
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
      // const { 인기작품 } = action.payload[0];
      // const { 주목작가 } = action.payload[1];
      // const { 후기 } = action.payload[2];
      // state.bestStore = 인기작품;
      // state.recommendArtist = 주목작가;
      // state.bestReview = 후기;

      const { bestPost, bestReview, bestWriter } = action.payload;

      state.bestStore = bestPost;
      state.recommendArtist = bestWriter;
      state.bestReview = bestReview;
    },
  },
});

const { reducer, actions } = mainSlice;
export const { getHomeData } = actions;
export default reducer;
