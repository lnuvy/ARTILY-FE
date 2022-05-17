import { createSlice } from "@reduxjs/toolkit";

/*
 * @ 작성자 한울
 * 스토어, 리뷰 작성단계에서 쓸수있는 프리뷰 이미지를 저장하는 리덕스
 *
 */

// represent 대표이미지, imageArr 추가로 올리는사진들
const initialState = {
  preview: null,
  represent: null,
  imageArr: [],
  fileObj: [],
};

const removePreviewWhich = (image) => {};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    // 사진을 하나씩 추가할때
    accrueImage: (state, action) => {
      // 첫게시라면 represent 에 저장
      state.imageArr.push(action.payload);
    },

    //프로필 설정
    setProfileImage: (state, action) => {
      state.preview = action.payload;
    },
    resetProfileImage: (state, action) => {
      state.preview = null;
    },

    // 프리뷰 사진을 지울때
    removePreview: (state, action) => {
      console.log(state.imageArr);
      console.log(action);
      state.imageArr = state.imageArr.filter((el) => {
        return el !== action.payload;
      });
    },

    removeFileObj: (state, action) => {
      console.log(action.payload);
      if (state.fileObj.length === 1) {
        state.fileObj = [];
      } else {
        let newArr = state.fileObj.filter((arr) => arr[0] !== action.payload);
        state.fileObj = newArr;
      }
    },
    // // 사용자가 대표이미지를 바꾸고싶을때
    // setRepresent: (state, action) => {
    //   let temp = state.represent;
    //   state.represent = action.payload;
    //   let newArr = state.imageArr.filter((el) => el !== action.payload);
    //   state.imageArr = [...newArr, temp];
    // },

    // 5/6 채팅에서 사진 변경할때
    setPreview: (state, action) => {
      state.represent = action.payload;
    },

    // 5/9 파일형태 저장
    inputfileObj: (state, action) => {
      let nowIndex = state.imageArr.length;
      console.log(nowIndex);
      state.fileObj.push([nowIndex, action.payload]);
    },

    editPosts3Url: (state, action) => {
      state.imageArr = action.payload;
    },

    // 업로드하지않았을때
    clearPreview: (state) => {
      state.represent = null;
      state.imageArr = [];
      state.fileObj = [];
    },
  },
});

const { reducer, actions } = imageSlice;
export const {
  accrueImage,
  removePreview,
  removeFileObj,
  setRepresent,
  setPreview,
  clearPreview,
  setProfileImage,
  resetProfileImage,
  inputfileObj,
  editPosts3Url,
} = actions;
export default reducer;
