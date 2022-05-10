import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Apis } from "../../shared/api";
// import { storeDummy } from "../../shared/Dummy";
const MySwal = withReactContent(Swal);

/*
 * @한울
 * 4/29
 * 상세페이지로 넘어갈때 리덕스에 해당 데이터만 넣어서 StoreDetail 에서 가져오는 식으로 진행했습니다
 */

// list: 데이터 담기는곳, isFetching: 데이터를 불러오는중인지, infinityScroll: 구분하는 아이디 등 넣는곳
const initialState = {
  list: [],
  filterList: [],
  isFetching: false,
  infinityScroll: {},
  detailData: null,
};

export const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    // const pageHandler = {
    //   page: 1,
    //   limit: 6,
    // };

    Apis.getStore()
      .then((res) => {
        console.log(res.data);
        dispatch(getStoreData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });

    // 더미데이터 리덕스 주입
    // dispatch(getStoreData(storeDummy));
  };
};

export const getPostOne = (postId) => {
  return async function (dispatch, getState, { history }) {
    Apis.getStoreDetail(postId)
      .then((res) => {
        console.log(res.data);
        const { detail, getUser } = res.data.data;
        dispatch(go2detail(detail));
      })
      .catch((err) => {
        console.log(err);
      });

    // 더미데이터 임시방편
    // dispatch(getStoreData(storeDummy));
    // const allList = getState().store.list;
    // const now = allList.find((l) => l.postId === postId);
    // dispatch(go2detail(now));
  };
};

export const addPostDB = (data) => {
  return async function (dispatch, getState, { history }) {
    Apis.postStore(data)
      .then((res) => {
        alert("작성완료");
        history.replace("/store");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

export const editPostDB = (postId, formData) => {
  return async function (dispatch, getState, { history }) {
    Apis.patchStore(postId, formData)
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
        console.log(err.response);
      });
  };
};

export const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    Apis.deleteStore(postId)
      .then((res) => {
        console.log(res);
        alert("삭제완료");
        dispatch(deletePost(postId));
        history.replace("/store");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const postsSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    // 처음 모든 데이터 불러오기만하기 (list 는 저장용도)
    getStoreData: (state, action) => {
      state.list = action.payload;
      state.filterList = action.payload;
    },
    // 데이터 하나 특정하기
    go2detail: (state, action) => {
      state.detailData = action.payload;
    },
    // 카테고리 필터 이름변경
    filteringData: (state, action) => {
      if (action.payload === "전체") {
        state.filterList = state.list;
        return;
      }
      state.filterList = state.list.filter(
        (post) => post.category === action.payload
      );
    },
    // 모달창의 필터링 내용으로 filterList 업데이트하기
    modalFiltering: (state, action) => {
      const { transaction, region } = action.payload;

      // 필터링 전 초기화(다시 모두 채우기)
      state.filterList = state.list;

      let newFilterList = [];
      // 거래방식이 전체가 아닐때 (직거래 or 택배 가 있음)
      if (transaction !== "전체") {
        newFilterList = state.filterList.filter(
          (l) => l.transaction === transaction
        );
        state.filterList = newFilterList;
      } else {
        newFilterList = state.filterList;
      }
      // 지역이 전체가 아닐때
      let regionList = [];
      if (region[0] !== "전체") {
        regionList = newFilterList.filter((l) => {
          for (let i = 0; i < region.length; i++) {
            if (l.user.address.includes(region[i])) {
              return l;
            }
          }
        });
        state.filterList = regionList;
      }
    },
    deletePost: (state, action) => {
      let newArr = state.filterList.filter((l) => l.postId !== action.payload);
      state.filterList = newArr;

      newArr = state.list.filter((l) => l.postId !== action.payload);
      state.list = newArr;
    },

    // 마크업 1 늘리고 줄이기
    markupToggle: (state, action) => {
      const { isUp } = action.payload;

      if (isUp) {
        state.detailData.markupCnt++;
      } else {
        state.detailData.markupCnt--;
      }

      state.list.forEach((post) => {
        if (post.postId === state.detailData.postId) {
          post.markupCnt = state.detailData.markupCnt;
          console.log("마크업카운트 전체리스트에 적용");
          return;
        }
      });
      state.filterList.forEach((post) => {
        if (post.postId === state.detailData.postId) {
          post.markupCnt = state.detailData.markupCnt;
          console.log("마크업카운트 필터리스트에 적용");
          return;
        }
      });
    },
  },
});

const { reducer, actions } = postsSlice;
export const {
  getStoreData,
  go2detail,
  filteringData,
  modalFiltering,

  // 리덕스 내에서만 처리하는 함수
  markupToggle,
  deletePost,
} = actions;
export default reducer;
