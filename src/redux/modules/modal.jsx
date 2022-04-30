import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOn: false,
  title: "모달 제목",
  content: <></>,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log(action.payload);
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.modalOn = true;
    },
    closeModal: (state) => {
      state.modalOn = false;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { openModal, closeModal } = actions;
export default reducer;
