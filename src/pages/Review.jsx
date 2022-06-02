import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
// components
import { Grid, Wrap } from "../elements";
import { ReviewCard, Category, NoInfo } from "../components/index";
// moduels
import {
  getReviewData,
  getReviewDB,
  likeReviewListDB,
  myreviewLikeList,
} from "../redux/modules/reviews";

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

  useEffect(() => {
    dispatch(myreviewLikeList([]));
  }, []);

  useEffect(() => {
    dispatch(likeReviewListDB());
  }, []);

  return (
    <>
      <Grid>
        <Category review />
        <Wrap margin="16px">
          <NoInfo list={filteringList} text1="해당 카테고리 리뷰가 없습니다.">
            <Grid gtc="1fr 1fr" margin="0 0 20px">
              {filteringList &&
                filteringList.map((v, i) => {
                  return (
                    <ReviewCard
                      key={v.reviewId}
                      onClick={() => clickCard(v.reviewId)}
                      {...v}
                      images={(v.images && v.images[0].imageUrl) || null}
                    />
                  );
                })}
            </Grid>
          </NoInfo>
        </Wrap>
      </Grid>
    </>
  );
};

export default Review;
