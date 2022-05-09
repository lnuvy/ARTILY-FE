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
    // await axios.get()
    Apis.getHome()
      .then(function (response) {
        console.log(response);
        dispatch(getHomeData(response.data));
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
      const { artPost } = action.payload[0];
      // const { 주목작가 } = action.payload[1];
      const { reviwPage } = action.payload[2];
      state.bestStore = artPost;
      // state.recommendArtist = 주목작가;
      state.bestReview = reviwPage;
    },
  },
});

const { reducer, actions } = mainSlice;
export const { getHomeData } = actions;
export default reducer;
