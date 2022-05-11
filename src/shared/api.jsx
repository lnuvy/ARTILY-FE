import axios from "axios";

const Api = axios.create({
  baseURL: "https://rusy7225.shop/",
});

// Api.defaults.headers.common["authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;

// 토큰
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMjIxNjkzNjE0IiwiaWF0IjoxNjUxODQ2NjI3fQ.O_LCYnV5NDxh5H2xfMcCEaIup0KU4DCbeyyJv7ar3Tg

Api.defaults.headers.common["authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

//rusy7225.shop/api/review/480d33d1bf3d

// May8 api 통합 관리
export const Apis = {
  getHome: () => Api.get("/api/post"),
  getReview: (pageHandler) => Api.get("api/review", pageHandler),
  // getReviewDetail: (reviewId) => Api.get(`api/review/:${reviewId}`),
  getReviewDetail: (reviewId) => Api.get(`api/review/480d33d1bf3d`),
  postReview: (reviewContents) => Api.post("api/review", reviewContents),
  editReview: (reviewId, reviewContents) =>
    Api.patch(`api/review/:${reviewId}`, reviewContents),
  deleteReview: (reviewId) =>
    Api.delete(`api/review/:${reviewId}`, { reviewId: reviewId }),
};
