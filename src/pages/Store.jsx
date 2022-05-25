// import React, { useCallback, useEffect, useState, useRef } from "react";
// import { StoreCard, Footer } from "../components";
// import Category from "../components/Category";

// import { Checkbox, Flex, Grid, Input, Text, Wrap } from "../elements";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getStoreData,
//   getPostDB,
//   go2detail,
//   filteringData,
// } from "../redux/modules/store";
// import { history } from "../redux/configureStore";
// import _ from "lodash";
// import { Apis } from "../shared/api";
// import { openModal } from "../redux/modules/modal";
// import StoreFilter from "../shared/modal/modalContent/StoreFilter";
// import { FilterFilled, Search } from "../assets/icons";
// import theme from "../styles/theme";
// import ScrollSpinner from "../shared/ScrollSpinner";

// //intersection observer
// const Store = () => {
//   //무한스크롤

//   const [data, setData] = useState("");
//   const [postList, setPostList] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   // const [hasMore, setHasMore] = useState(true);
//   const loader = useRef(null);
//   // const PAGE_LIMIT = 50;

//   const dispatch = useDispatch();
//   const { list, filterList } = useSelector((state) => state.store);

//   const getPostList = () => {
//     setIsLoading(true);
//     Apis.getStore(pageNumber)
//       .then((response) => {
//         console.log("서버에게 받은 데이터", response.data.data);
//         setIsLoading(false);
//         setPostList((items) => [...items, ...response.data.data]);
//         // setHasMore(pageNumber !== PAGE_LIMIT);
//       })
//       .catch((error) => console.warn(error));
//   };

//   useEffect(() => {
//     getPostList(pageNumber);
//   }, [pageNumber]);

//   const onIntersect = (entries) => {
//     entries.forEach((element) => {
//       if (element.isIntersecting) {
//         setPageNumber((prev) => prev + 1);
//       }
//     });
//   };
//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.25,
//     };

//     const observer = new IntersectionObserver(onIntersect, options);
//     observer.observe(loader.current);
//     return () => observer.disconnect();
//   }, [loader]);

//   // 카테고리 필터링
//   useEffect(
//     () => {
//       // store data reset
//       dispatch(getStoreData([]));
//       // store api 두번요청되는걸 막기위함
//       dispatch(getPostDB());
//     },
//     // }
//     []
//   );

//   // 모달 필터링
//   const [filtering, setFiltering] = useState({
//     transaction: "전체",
//     region: ["전체"],
//   });
//   // 검색창 인풋
//   const [query, setQuery] = useState("");
//   // 체크박스 체크될때 데이터 필터링
//   const [isFree, setIsFree] = useState(false);

//   const checkFree = (e) => {
//     const { checked } = e.target;

//     // 체크박스 체크되고 freeList가 빈배열일때 필터
//     if (checked) {
//       setIsFree(true);
//     } else {
//       setIsFree(false);
//     }
//   };

//   // 검색필터
//   const searchList = filterList
//     ?.filter((l) => {
//       const address = l?.user?.address || "";
//       const title = l?.postTitle;
//       const artist = l?.user?.nickname;
//       const q = query;

//       if (title && artist) {
//         return title.includes(q) || artist.includes(q) || address.includes(q);
//       }
//     })
//     .map((l) => {
//       return (
//         <StoreCard key={l.postId} {...l} onClick={() => handleClickData(l)} />
//       );
//     });

//   // 필터링 모달 켜기
//   const modalOn = () => {
//     dispatch(
//       openModal({
//         title: " ",
//         content: (
//           <StoreFilter filtering={filtering} setFiltering={setFiltering} />
//         ),
//       })
//     );
//   };

//   // 상세페이지 이동
//   const handleClickData = (data) => {
//     dispatch(go2detail(data));
//     history.push(`/store/view/${data.postId}`);
//   };
//   return (
//     <>
//       <Category data={setData} />
//       <Wrap margin="16px 16px 24px 16px">
//         <Input
//           square
//           br="8px"
//           padding="11px 16px"
//           margin="0 0 16px"
//           placeholder="작가명, 작품명 검색..."
//           icon={<Search color={theme.pallete.gray2} />}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <Wrap margin="16px 0">
//           <Flex jc="space-between">
//             <Checkbox
//               checked={isFree}
//               id="checkFree"
//               zoom={1.3}
//               onChange={checkFree}
//             >
//               <Text body2>나눔 작품만 보기</Text>
//             </Checkbox>
//             <Flex onClick={modalOn} jc="center" ai="center">
//               <Text body2>거래 방식 / 지역 선택하기</Text>
//               {filtering.transaction === "전체" &&
//               filtering.region[0] === "전체" ? (
//                 <FilterFilled fill={theme.pallete.gray3} />
//               ) : (
//                 <FilterFilled fill={theme.pallete.gray3} />
//               )}
//             </Flex>
//           </Flex>
//           <Flex>
//             {filtering.transaction !== "전체" && (
//               <Text margin="16px 0 0" body3 color={theme.pallete.gray3}>
//                 {filtering.region[0] !== "전체"
//                   ? `${filtering.transaction},`
//                   : filtering.transaction}
//               </Text>
//             )}
//             {filtering.region[0] !== "전체" &&
//               filtering.region.map((r, i, arr) => {
//                 if (i + 1 === arr.length) {
//                   return (
//                     <Text
//                       body3
//                       margin="16px 0 0"
//                       key={`${i}_filter_${r}`}
//                       color={theme.pallete.gray3}
//                     >
//                       &nbsp;{r}&nbsp;
//                     </Text>
//                   );
//                 } else {
//                   return (
//                     <Text
//                       body3
//                       margin="16px 0 0"
//                       key={`${i}_filter_${r}`}
//                       color={theme.pallete.gray3}
//                     >
//                       &nbsp;{r},
//                     </Text>
//                   );
//                 }
//               })}
//             <Text body3 margin="16px 0 0" color={theme.pallete.gray3}>
//               {filtering.transaction === "전체" ||
//               filtering.region.indexOf("전체") === 1
//                 ? null
//                 : ` 검색 결과 ${filterList.length}건`}
//             </Text>
//           </Flex>
//         </Wrap>
//         {setData === "전체" ? (
//           <>
//             <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0">
//               {searchList && query !== ""
//                 ? searchList
//                 : filterList &&
//                   postList.map((l) => {
//                     if (isFree) {
//                       if (l.price === "0") {
//                         //가격이 0원인 게시글 리스트를 보여줌
//                         return (
//                           <>
//                             <StoreCard
//                               key={l.postId}
//                               {...l}
//                               imageUrl={l.images[0].imageUrl}
//                               onClick={() => handleClickData(l)}
//                             />
//                           </>
//                         );
//                       }
//                     } else {
//                       <StoreCard
//                         key={l.postTitle}
//                         {...l}
//                         imageUrl={l.images[0].imageUrl}
//                         onClick={() => handleClickData(l)}
//                       />;
//                     }
//                   })}
//               <div ref={loader} className="loader">
//                 {isLoading && <ScrollSpinner />}
//               </div>
//             </Grid>
//           </>
//         ) : (
//           <>
//             <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0">
//               {searchList && query !== ""
//                 ? searchList
//                 : filterList &&
//                   filterList.map((v) => {
//                     if (isFree) {
//                       if (v.price === "0") {
//                         //가격이 0원인 게시글 리스트를 보여줌
//                         return (
//                           <>
//                             <StoreCard
//                               key={v.postId}
//                               {...v}
//                               imageUrl={v.images[0].imageUrl}
//                               onClick={() => handleClickData(v)}
//                             />
//                           </>
//                         );
//                       }
//                     } else
//                       return (
//                         <>
//                           <StoreCard
//                             key={v.postId}
//                             {...v}
//                             imageUrl={v.images[0].imageUrl}
//                             onClick={() => handleClickData(v)}
//                           />
//                         </>
//                       );
//                   })}
//               <div ref={loader} className="loader">
//                 {isLoading && <ScrollSpinner />}
//               </div>
//             </Grid>
//           </>
//         )}
//       </Wrap>
//       <Footer />
//     </>
//   );
// };

// export default Store;
import React, { useCallback, useEffect, useState } from "react";
import { StoreCard, Footer } from "../components";
import Category from "../components/Category";
import { Checkbox, Flex, Grid, Input, Text, Wrap } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import {
  getStoreData,
  getPostDB,
  go2detail,
  filteringData,
} from "../redux/modules/store";
import { history } from "../redux/configureStore";
import _ from "lodash";

import { openModal } from "../redux/modules/modal";
import StoreFilter from "../shared/modal/modalContent/StoreFilter";
import { FilterFilled, Search } from "../assets/icons";
import theme from "../styles/theme";

const Store = () => {
  const dispatch = useDispatch();
  const { list, filterList } = useSelector((state) => state.store);

  // 카테고리 필터링
  useEffect(() => {
    // store data reset
    dispatch(getStoreData([]));
    // store api 두번요청되는걸 막기위함
    dispatch(getPostDB());
  }, []);

  // 모달 필터링
  const [filtering, setFiltering] = useState({
    transaction: "전체",
    region: ["전체"],
  });

  // 검색창 인풋
  const [query, setQuery] = useState("");
  // 체크박스 체크될때 데이터 필터링
  const [isFree, setIsFree] = useState(false);

  const checkFree = (e) => {
    const { checked } = e.target;

    // 체크박스 체크되고 freeList가 빈배열일때 필터
    if (checked) {
      setIsFree(true);
    } else {
      setIsFree(false);
    }
  };

  // 검색필터
  const searchList = filterList
    ?.filter((l) => {
      const address = l?.user?.address || "";
      const title = l?.postTitle;
      const artist = l?.user?.nickname;
      const q = query;

      if (title && artist) {
        return title.includes(q) || artist.includes(q) || address.includes(q);
      }
    })
    .map((l) => {
      return (
        <StoreCard key={l.postId} {...l} onClick={() => handleClickData(l)} />
      );
    });

  // 필터링 모달 켜기
  const modalOn = () => {
    dispatch(
      openModal({
        title: "",
        content: (
          <StoreFilter filtering={filtering} setFiltering={setFiltering} />
        ),
      })
    );
  };

  // 상세페이지 이동
  const handleClickData = (data) => {
    dispatch(go2detail(data));
    history.push(`/store/view/${data.postId}`);
  };
  return (
    <>
      <Category />
      <Wrap margin="16px 16px 24px 16px">
        <Input
          square
          br="8px"
          padding="11px 16px"
          margin="0 0 16px"
          placeholder="작가명, 작품명 검색..."
          icon={<Search color={theme.pallete.gray2} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Wrap margin="16px 0">
          <Flex jc="space-between">
            <Checkbox checked={isFree} id="checkFree" onChange={checkFree}>
              <Text body2>나눔 작품만 보기</Text>
            </Checkbox>
            <Flex onClick={modalOn} jc="center" ai="center">
              <Text body2>거래 방식 / 지역 선택하기</Text>
              {filtering.transaction === "전체" &&
              filtering.region[0] === "전체" ? (
                <FilterFilled fill={theme.pallete.gray3} />
              ) : (
                <FilterFilled fill={theme.pallete.gray3} />
              )}
            </Flex>
          </Flex>
          <Flex>
            {filtering.transaction !== "전체" && (
              <Text margin="16px 0 0" body3 color={theme.pallete.gray3}>
                {filtering.region[0] !== "전체"
                  ? `${filtering.transaction},`
                  : filtering.transaction}
              </Text>
            )}
            {filtering.region[0] !== "전체" &&
              filtering.region.map((r, i, arr) => {
                if (i + 1 === arr.length) {
                  return (
                    <Text
                      body3
                      margin="16px 0 0"
                      key={`${i}_filter_${r}`}
                      color={theme.pallete.gray3}
                    >
                      &nbsp;{r}&nbsp;
                    </Text>
                  );
                } else {
                  return (
                    <Text
                      body3
                      margin="16px 0 0"
                      key={`${i}_filter_${r}`}
                      color={theme.pallete.gray3}
                    >
                      &nbsp;{r},
                    </Text>
                  );
                }
              })}
            {/* <Text body3 margin="16px 0 0" color={theme.pallete.gray3}>
              {filtering.transaction === "전체" ||
              filtering.region.indexOf("전체") === 1
                ? null
                : ` 검색 결과 ${filterList.length}건`}
            </Text> */}
          </Flex>
        </Wrap>
        {console.log(filterList)}

        <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0">
          {searchList && query !== ""
            ? searchList
            : filterList &&
              filterList.map((v) => {
                if (isFree) {
                  if (v.price === "0") {
                    return (
                      <StoreCard
                        key={v.postId}
                        {...v}
                        imageUrl={v.images[0].imageUrl}
                        onClick={() => handleClickData(v)}
                      />
                    );
                  }
                } else
                  return (
                    <StoreCard
                      key={v.postId}
                      {...v}
                      imageUrl={v.images[0].imageUrl}
                      onClick={() => handleClickData(v)}
                    />
                  );
              })}
        </Grid>
      </Wrap>
      {/* <Footer /> */}
    </>
  );
};

export default Store;
