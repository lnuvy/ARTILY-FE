import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createActions } from "redux-actions";

const initialState = {
  Message: false,
  text: "",
};

const toastMessageSlice = createSlice({
  name: "toastMessage",
  initialState,
  reducers: {
    fetchMessage: (state, action) => {
      state.Message = action.payload.Message;
      state.text = action.payload.text;
    },
  },
});

const { reducer, actions } = toastMessageSlice;
export const { fetchMessage } = actions;
export default reducer;
