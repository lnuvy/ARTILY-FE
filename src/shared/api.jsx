import axios from "axios";
import { getToken } from "./token";

const Api = axios.create({
  // baseURL: "https://rusy7225.shop",
  baseURL: "https://artily0.com",
});

// 이걸넣으니까 회원가입직후 토큰 인증됨
Api.interceptors.request.use(async (config) => {
  config.headers["content-type"] = "application/json; charset=utf-8";
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Accept"] = "*/*";
  config.headers["authorization"] = await getToken();
  return config;
});

// Api.defaults.headers.common["authorization"] = getToken();

const formDataConfig = { headers: { "Content-Type": `multipart/form-data;` } };

// 토큰
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMjIxNjkzNjE0IiwiaWF0IjoxNjUxODQ2NjI3fQ.O_LCYnV5NDxh5H2xfMcCEaIup0KU4DCbeyyJv7ar3Tg

//rusy7225.shop/api/review/480d33d1bf3d

// May8 api 통합 관리
export const Apis = {
  getHome: () => Api.get("/posts"),
  getReview: () => Api.get(`/reviews`),
  getReviewDetail: (reviewId) => Api.get(`/reviews/${reviewId}`),
  postReview: (postId, reviewContents) =>
    Api.post(`/reviews/${postId}`, reviewContents),
  editReview: (reviewId, reviewContents) =>
    Api.patch(`/reviews/${reviewId}`, reviewContents),
  deleteReview: (reviewId) =>
    Api.delete(`/reviews/${reviewId}`, { reviewId: reviewId }),
  likeReview: (reviewId) =>
    Api.post(`/likes/${reviewId}`, { reviewId: reviewId }),
  getLikeReview: () => Api.get(`/likes`),

  // store API
  // getStore: (pageHandler) =>
  //   Api.get(`/api/post/store&page=${pageHandler.page}`),
  getStore: (data) => Api.get(`/stores`, data),
  // getStoreFilter: () => Api.get(`/api/post/`) ,
  getStoreDetail: (postId) => Api.get(`posts/${postId}`),
  postStore: (data) => Api.post("/posts", data, formDataConfig),
  patchStore: (postId, data) =>
    Api.patch(`/posts/${postId}`, data, formDataConfig),
  deleteStore: (postId) => Api.delete(`/posts/${postId}`),
  getMyPostLike: () => Api.get(`/markup`), //찜 리스트
  postMyPostLike: (postId) => Api.post(`/markup/${postId}`), //찜하기
  makePostStateDone: (postId, data) => Api.patch(`/sale/${postId}`, data),

  // user API
  getKakaoCode: (code) => Api.get(`/oauth/kakao/callback?code=${code}`),
  getNaverCode: (code, state) =>
    Api.get(`/oauth/naver/callback?code=${code}&state=${state}`),
  getUser: () => Api.get(`users`),
  patchProfile: (data) => Api.patch(`/profiles`, data, formDataConfig), // 로그인 후 프로필 설정
  patchEditProfile: (data) =>
    Api.patch(`/mypage/profiles`, data, formDataConfig),

  //mypage API
  getMypageData: () => Api.get(`mypage/profiles`),
  getMyList: () => Api.get(`/mypage/posts`), //판매작품 관리하기(판매목록 조회)

  //userprofile API
  getUserProfile: (userId) => Api.get(`/profiles/${userId}`),

  //follow API
  postAddFollow: (followId) => Api.post(`/follow/${followId}`),

  // mybuy API
  getMyBuy: () => Api.get(`/mypage/purchases`),

  getMyFollowlist: () => Api.get(`/follow/myfollowlist`),
  getMyFollowerlist: () => Api.get(`/follow/myfollowerlist`),

  //다른 사람의 팔로우 & 팔로워 리스트 조회
  getUserFollowlist: (userId) => Api.get(`/follow/followlist/${userId}`),
  getUserFollowerlist: (userId) => Api.get(`/follow/followerlist/${userId}`),

  //팔로워 삭제
  deleteFollower: (userId) => Api.delete(`/follow/${userId}`),

  // chat API
  getChatData: () => Api.get(`/chats/data`),
  getMessages: (roomname) => Api.get(`/chats/messages/${roomname}`),
};
// import axios from "axios";
// import { getToken } from "./token";

// const Api = axios.create({
//   // baseURL: "https://rusy7225.shop",
//   baseURL: "https://artily0.com",
// });

// // 이걸넣으니까 회원가입직후 토큰 인증됨
// Api.interceptors.request.use(async (config) => {
//   config.headers["content-type"] = "application/json; charset=utf-8";
//   config.headers["X-Requested-With"] = "XMLHttpRequest";
//   config.headers["Accept"] = "*/*";
//   config.headers["authorization"] = await getToken();
//   return config;
// });

// // Api.defaults.headers.common["authorization"] = getToken();

// const formDataConfig = { headers: { "Content-Type": `multipart/form-data;` } };

// // 토큰
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMjIxNjkzNjE0IiwiaWF0IjoxNjUxODQ2NjI3fQ.O_LCYnV5NDxh5H2xfMcCEaIup0KU4DCbeyyJv7ar3Tg

// //rusy7225.shop/api/review/480d33d1bf3d
// const limit = 6;
// // May8 api 통합 관리
// export const Apis = {
//   getHome: () => Api.get("/api/post"),
//   getReview: (pageNumber) =>
//     Api.get(`api/review?page=${pageNumber}&limit=${limit}`),
//   getReviewDetail: (reviewId) => Api.get(`api/review/detail/${reviewId}`),
//   likeReview: (reviewId) => Api.post(`api/like/${reviewId}`),
//   postReview: (postId, reviewContents) =>
//     Api.post(`api/review/${postId}`, reviewContents),
//   editReview: (reviewId, reviewContents) =>
//     Api.patch(`api/review/${reviewId}`, reviewContents),
//   deleteReview: (reviewId) =>
//     Api.delete(`api/review/${reviewId}`, { reviewId: reviewId }),
//   likeReview: (reviewId) =>
//     Api.post(`api/like/${reviewId}`, { reviewId: reviewId }),
//   getLikeReview: () => Api.get(`api/like`),

//   // store API
//   // getStore: (pageHandler) =>
//   //   Api.get(`/api/post/store&page=${pageHandler.page}`),
//   getStore: (pageNumber, data) =>
//     Api.get(`api/post/store?page=${pageNumber}&limit=${limit}`, data),
//   // getStoreFilter: () => Api.get(`/api/post/`) ,
//   getStoreDetail: (postId) => Api.get(`api/post/${postId}`),
//   postStore: (data) => Api.post("/api/post", data, formDataConfig),
//   patchStore: (postId, data) =>
//     Api.patch(`/api/post/${postId}`, data, formDataConfig),
//   deleteStore: (postId) => Api.delete(`/api/post/${postId}`),
//   getMyPostLike: () => Api.get(`/api/markup`),
//   postMyPostLIke: (postId) => Api.post(`/api/markup/${postId}`),
//   makePostStateDone: (postId, data) => Api.patch(`/api/done/${postId}`, data),

//   // user API
//   getKakaoCode: (code) => Api.get(`/oauth/kakao/callback?code=${code}`),
//   getNaverCode: (code, state) =>
//     Api.get(`/oauth/naver/callback?code=${code}&state=${state}`),
//   getUser: () => Api.get(`/api/user/getuser`),
//   patchProfile: (data) => Api.patch(`/api/profile`, data, formDataConfig), // 회원가입후 닉네임/프사
//   patchEditProfile: (data) =>
//     Api.patch(`/api/profile/update`, data, formDataConfig),

//   //mypage API
//   getMypageData: () => Api.get(`/api/myprofile`),
//   getMyList: () => Api.get(`/api/mypost`),
//   getMyBuyList: () => Api.get(`/api/profile/mypost`),

//   //userprofile API
//   getUserProfile: (userId) => Api.get(`/api/profile/${userId}`),

//   //follow API
//   postAddFollow: (followId) => Api.post(`/api/follow/${followId}`),

//   // mybuy API
//   getMyBuy: () => Api.get(`/api/mybuy`),

//   getMyFollowlist: () => Api.get(`/api/follow/myfollowlist`),
//   getMyFollowerlist: () => Api.get(`/api/follow/myfollowerlist`),

//   getUserFollowlist: (userId) => Api.get(`/api/follow/followlist/${userId}`),
//   getUserFollowerlist: (userId) =>
//     Api.get(`/api/follow/followerlist/${userId}`),
//   //팔로워 삭제
//   deleteFollower: (userId) => Api.delete(`/api/follow/delete/${userId}`),

//   // chat API
//   getChatData: () => Api.get(`/api/chat/data`),
//   getMessages: (roomName) => Api.get(`/api/chat/messages/${roomName}`),
// };
