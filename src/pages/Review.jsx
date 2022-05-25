// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { history } from "../redux/configureStore";
// // components
// import { Grid, Wrap } from "../elements";
// import { ReviewCard, Category } from "../components/index";
// // moduels
// import { getReviewData, getReviewDB } from "../redux/modules/reviews";
// import { Apis } from "../shared/api";
// import ScrollSpinner from "../shared/ScrollSpinner";
// const Review = () => {
//   const dispatch = useDispatch();

//   // const reviewList = useSelector((state) => state.review.list);
//   const filteringList = useSelector((state) => state.review.filterList);

//   function clickCard(reviewId) {
//     history.push(`/review/view/${reviewId}`);
//   }
//   const [data, setData] = useState("");
//   console.log("나 지금 리뷰에서", data, "눌렀다");
//   const [reviewList, setreviewList] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   // const [hasMore, setHasMore] = useState(true);
//   const loader = useRef(null);
//   // const PAGE_LIMIT = 50;

//   const getReviewList = () => {
//     setIsLoading(true);
//     Apis.getReview(pageNumber, data)
//       .then((response) => {
//         console.log("서버에게 받은 리뷰 데이터", response.data.reviews);
//         const getData = response.data.reviews;
//         if (getData.length === 0) {
//           console.log("다음 게시글이 없습니다!");
//         }
//         setIsLoading(false);
//         setreviewList((items) => [...items, ...getData]);
//         // dispatch(getReviewData());
//         // setHasMore(pageNumber !== PAGE_LIMIT);
//       })
//       .catch((error) => console.warn(error));
//   };

//   useEffect(() => {
//     getReviewList();
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

//   useEffect(() => {
//     // reset
//     // dispatch(getReviewData([]));
//     // get
//     // dispatch(getReviewDB());
//   }, []);

//   return (
//     <>
//       <Grid>
//         <Category review data={setData} />
//         <Wrap margin="16px">
//           <Grid gtc="1fr 1fr" margin="0 0 20px">
//             {filteringList &&
//               reviewList.map((v, i) => {
//                 // console.log(v.images);
//                 return (
//                   <ReviewCard
//                     _key={`${i}_${Math.random() * 10}`}
//                     onClick={() => clickCard(v.reviewId)}
//                     {...v}
//                     images={v.images[0].imageUrl || null}
//                   />
//                 );
//               })}
//           </Grid>
//           <div ref={loader} className="loader">
//             {isLoading && <ScrollSpinner />}
//           </div>
//         </Wrap>
//       </Grid>
//     </>
//   );
// };

// export default Review;

// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { history } from "../redux/configureStore";
// // components
// import { Grid, Wrap } from "../elements";
// import { ReviewCard, Category } from "../components/index";
// // moduels
// import { getReviewData, getReviewDB } from "../redux/modules/reviews";
// import { Apis } from "../shared/api";
// import ScrollSpinner from "../shared/ScrollSpinner";

// const Review = () => {
//   const dispatch = useDispatch();
//   const [data, setData] = useState();
//   const [reviewsList, setReviewList] = useState([]);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);

//   const reviewList = useSelector((state) => state.review.list);
//   const filteringList = useSelector((state) => state.review.filterList);
//   const loader = useRef(null);
//   function clickCard(reviewId) {
//     history.push(`/review/view/${reviewId}`);
//   }
//   const getReviewList = () => {
//     setIsLoading(true);
//     Apis.getReview(pageNumber)
//       .then((response) => {
//         console.log("서버에게 받은 데이터", response.data.reviews);
//         setIsLoading(false);
//         setReviewList((items) => [...items, ...response.data.reviews]);
//         // setHasMore(pageNumber !== PAGE_LIMIT);
//       })
//       .catch((error) => console.warn(error));
//   };

//   useEffect(() => {
//     getReviewList(pageNumber);
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
//   useEffect(() => {
//     // reset
//     dispatch(getReviewData());
//     // get
//     dispatch(getReviewDB());
//   }, []);

//   return (
//     <>
//       <Grid>
//         <Category review data={setData} />
//         {setData === "전체" ? (
//           <Wrap margin="16px">
//             <Grid gtc="1fr 1fr" margin="0 0 20px">
//               {filteringList &&
//                 reviewsList.map((v, i) => {
//                   console.log(v);
//                   return (
//                     <ReviewCard
//                       _key={`${v}_${i}`}
//                       onClick={() => clickCard(v.reviewId)}
//                       {...v}
//                       images={v.images[0].imageUrl}
//                     />
//                   );
//                 })}
//             </Grid>
//             <div ref={loader} className="loader">
//               {isLoading && <ScrollSpinner />}
//             </div>
//           </Wrap>
//         ) : (
//           <Wrap margin="16px">
//             <Grid gtc="1fr 1fr" margin="0 0 20px">
//               {filteringList &&
//                 filteringList.map((d, i) => {
//                   return (
//                     <ReviewCard
//                       _key={`${d}_${i}`}
//                       onClick={() => clickCard(d.reviewId)}
//                       {...d}
//                       images={d.images[0].imageUrl}
//                     />
//                   );
//                 })}
//             </Grid>
//             <div ref={loader} className="loader">
//               {isLoading && <ScrollSpinner />}
//             </div>
//           </Wrap>
//         )}
//       </Grid>
//     </>
//   );
// };

// export default Review;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
// components
import { Grid, Wrap } from "../elements";
import { ReviewCard, Category } from "../components/index";
// moduels
import { getReviewData, getReviewDB } from "../redux/modules/reviews";

const Review = () => {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.review.list);
  const filteringList = useSelector((state) => state.review.filterList);

  function clickCard(reviewId) {
    history.push(`/review/view/${reviewId}`);
  }

  useEffect(() => {
    // reset
    dispatch(getReviewData(null));
  }, []);

  useEffect(() => {
    // get
    dispatch(getReviewDB());
  }, []);

  return (
    <>
      <Grid>
        <Category review />
        <Wrap margin="16px">
          <Grid gtc="1fr 1fr" margin="0 0 20px">
            {filteringList &&
              filteringList.map((v, i) => {
                console.log(v.images);
                return (
                  <ReviewCard
                    _key={i}
                    onClick={() => clickCard(v.reviewId)}
                    {...v}
                    images={v.images[0].imageUrl || null}
                  />
                );
              })}
          </Grid>
        </Wrap>
      </Grid>
    </>
  );
};

export default Review;
