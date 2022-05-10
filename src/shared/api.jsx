import axios from "axios";

const Api = axios.create({
  baseURL: "http://43.200.8.138",
});

Api.defaults.headers.common["authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const formDataConfig = { headers: { "Content-Type": `multipart/form-data;` } };

// May8 api 통합 관리
export const Apis = {
  getHome: () => Api.get("/api/post"),
  getReview: (pageHandler) => Api.get("api/review", pageHandler),
  getReviewDetail: (reviewId) => Api.get(`api/review/:${reviewId}`),
  postReview: (reviewContents) => Api.post("api/review", reviewContents),
  editReview: (reviewId, reviewContents) =>
    Api.patch(`api/review/:${reviewId}`, reviewContents),
  deleteReview: (reviewId) =>
    Api.delete(`api/review/:${reviewId}`, { reviewId: reviewId }),

  // store API
  // getStore: (pageHandler) =>
  //   Api.get(`/api/post/store&page=${pageHandler.page}`),
  getStore: () => Api.get(`/api/post/store`),
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
};
