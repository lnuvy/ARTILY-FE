// import { createSlice } from "@reduxjs/toolkit";

// import { Apis } from "../../shared/api";

// const initialState = {
//   list: ["용감한 지렁이"],
// };
// //follow 목록 조회
// export const addFollowListDB = (followId) => {
//   return function (dispatch, getState, { history }) {
//     Apis.getMypageData(followId)
//       .then((res) => {
//         console.log(res);
//         dispatch(getmyfollowdata(followId));
//         history.push("/follow");
//       })
//       .catch((error) => {
//         console.log("마이페이지 조회 실패", error);
//         window.alert("마이페이지를 조회하는 데 문제가 발생했습니다!");
//       });
//   };
// };

// const postsSlice = createSlice({
//   name: "follow",
//   initialState: initialState,
//   reducers: {
//     getmyfollowdata: (state, action) => {
//     },
//   },
// });

// const { reducer, actions } = postsSlice;

// export const { getmyfollowdata } = actions;
// export default reducer;
