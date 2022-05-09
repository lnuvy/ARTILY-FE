import axios from "axios";

const Api = axios.create({
  baseURL: "http://13.124.169.236",
});

Api.defaults.headers.common["authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

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
};
