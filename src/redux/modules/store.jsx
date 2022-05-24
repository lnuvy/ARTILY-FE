import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Apis } from "../../shared/api";
import { addMyPost, changeAddressDB } from "./user";
// import _ from "lodash";
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
  //무한스크롤
  // isFetching: false,
  // infinityScroll: {},

  // paging: { start: null, next: null, size: 3 },
  // is_loading: false,

  detailData: null,
  otherPost: [],
};

export const getPostDB = (pageNumber) => {
  return async function (dispatch, getState, { history }) {
    // const pageHandler = {
    //   page: 1,
    //   limit: 6,
    // };
    // let _paging =getState().store.paging
    Apis.getStore(pageNumber)
      .then((res) => {
        console.log("스토어 get요청", res.data.data);
        dispatch(getStoreData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getPostOne = (postId) => {
  return async function (dispatch, getState, { history }) {
    Apis.getStoreDetail(postId)
      .then((res) => {
        console.log("스토어 상세페이지", res.data);
        const { detail, getUser } = res.data.data;
        dispatch(go2detail(...detail));
        dispatch(otherPost(getUser));
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

export const addPostDB = (data, address) => {
  return async function (dispatch, getState, { history }) {
    const nowUser = getState().user.user;
    Apis.postStore(data)
      .then((res) => {
        if (!nowUser.address) {
          MySwal.fire({
            title: "주소 기본등록",
            text: "지금 설정한 주소를 기본주소로 저장할까요?",
            showDenyButton: true,
            confirmButtonText: "네",
            denyButtonText: `아니오`,
          }).then((result) => {
            if (result.isConfirmed) {
              // 유저 주소 변경시켜주기
              dispatch(changeAddressDB(address));
              Swal.fire(
                "저장완료",
                `"${address}" 기본주소로 저장했어요!`,
                "success"
              );
            } else if (result.isDenied) {
              Swal.fire("", "저장하지 않고 게시글을 등록합니다.", "info");
            }
          });
        } else {
          Swal.fire("", "게시글 등록 완료", "success");
        }
        // addMyPost()
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

        Swal.fire("게시글 수정", `게시글이 수정되었습니다!`, "success");
        history.replace("/store");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.msg);
        Swal.fire(
          err.response.data.msg,
          `수정중 문제가 발생했습니다!`,
          "error"
        );
        history.replace("/store");
      });
  };
};

export const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    Apis.deleteStore(postId)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "포스팅 삭제",
          text: "삭제되었습니다.",
        });
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
      // state.list.push(...action.payload.list);
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

    otherPost: (state, action) => {
      state.otherPost = action.payload;
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
  otherPost,
  markupToggle,
  deletePost,
} = actions;
export default reducer;
