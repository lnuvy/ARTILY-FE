import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOn: false,
  title: null,
  content: <></>,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.modalOn = true;
    },
    openDragModal: (state, action) => {
      state.content = action.payload;
      state.modalOn = true;
    },
    closeModal: (state) => {
      state.modalOn = false;
      state.title = null;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { openModal, openDragModal, closeModal } = actions;
export default reducer;
