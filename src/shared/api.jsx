import axios from "axios";
import { getToken } from "./token";

const Api = axios.create({
  baseURL: "https://rusy7225.shop",
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
  getHome: () => Api.get("/api/post"),
  getReview: (pageHandler) => Api.get("api/review?page=1&limit=6"),
  getReviewDetail: (reviewId) => Api.get(`api/review/detail/${reviewId}`),
  likeReview: (reviewId) => Api.post(`api/like/${reviewId}`),
  postReview: (postId, reviewContents) =>
    Api.post(`api/review/${postId}`, reviewContents),
  editReview: (reviewId, reviewContents) =>
    Api.patch(`api/review/${reviewId}`, reviewContents),
  deleteReview: (reviewId) =>
    Api.delete(`api/review/${reviewId}`, { reviewId: reviewId }),
  likeReview: (reviewId) =>
    Api.post(`api/like/${reviewId}`, { reviewId: reviewId }),

  // store API
  // getStore: (pageHandler) =>
  //   Api.get(`/api/post/store&page=${pageHandler.page}`),
  getStore: () => Api.get(`/api/post/store`),
  // getStoreFilter: () => Api.get(`/api/post/`) ,
  getStoreDetail: (postId) => Api.get(`api/post/${postId}`),
  postStore: (data) => Api.post("/api/post", data, formDataConfig),
  patchStore: (postId, data) =>
    Api.patch(`/api/post/${postId}`, data, formDataConfig),
  deleteStore: (postId) => Api.delete(`/api/post/${postId}`),

  // user API
  getKakaoCode: (code) => Api.get(`/oauth/kakao/callback?code=${code}`),
  getNaverCode: (code, state) =>
    Api.get(`/oauth/naver/callback?code=${code}&state=${state}`),
  getUser: () => Api.get(`/api/user/getuser`),
  patchProfile: (data) => Api.patch(`/api/profile`, data, formDataConfig), // 회원가입후 닉네임/프사
  patchEditProfile: (data) =>
    Api.patch(`/api/profile/update`, data, formDataConfig),
  postMarkUp: (postId) => Api.post(`/api/markup/${postId}`),

  //mypage API
  getMypageData: () => Api.get(`/api/myprofile`),
  getMyList: () => Api.get(`/api/mypost`),
  getMyBuyList: () => Api.get(`/api/profile/mypost`),

  //userprofile API
  getUserProfile: (userId) => Api.get(`/api/profile/${userId}`),

  //follow API
  postAddFollow: (followId) => Api.post(`/api/follow/${followId}`),

  getMyFollowlist: () => Api.get(`/api/follow/myfollowlist`),
  getMyFollowerlist: () => Api.get(`/api/follow/myfollowerlist`),

  getUserFollowlist: (userId) => Api.get(`/api/follow/followlist/${userId}`),
  getUserFollowerlist: (userId) =>
    Api.get(`/api/follow/followerlist/${userId}`),

  //팔로워 삭제
  deleteFollower: (userId) => Api.delete(`/api/follow/delete/${userId}`),

  // chat API
  getChatData: () => Api.get(`/api/chat/data`),
  getMessages: () => Api.get(`/api/chat/messages`),
};
