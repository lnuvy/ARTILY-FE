import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { homeDummy } from "../../shared/Dummy";
import { getToken } from "../../shared/token";

// const BASE_URL = "http://52.78.183.202";
const BASE_URL = "http://13.125.83.59";

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
    const config = { Authorization: `Bearer ${getToken()}` };

    await axios
      .get(`${BASE_URL}/api/post`, config)
      .then((res) => {
        console.log(res);
        // const { artPost, reviewPage } = res.data;
        dispatch(getHomeData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });

    // 더미데이터 리덕스 주입
    // const bestStore = homeDummy[0].인기작품;
    // const artist = homeDummy[1].주목작가;
    // const reivew = homeDummy[2].후기;

    // dispatch(getHomeData(homeDummy));
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
      state.bestStore = action.payload.artPost;
      state.bestReview = action.payload.reviwPage; // TODO: ㅋㅋ 오타
    },
  },
});

const { reducer, actions } = mainSlice;
export const { getHomeData } = actions;
export default reducer;
