import { createSlice } from "@reduxjs/toolkit";
import { Apis } from "../../shared/api";

const initialState = {
  bestPost: [],
  bestWriter: [],
  bestReview: [],
};

export const getHomeDataDB = () => {
  return async function (dispatch, getState, { history }) {
    Apis.getHome()
      .then(function (response) {
        dispatch(getHomeData(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
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
