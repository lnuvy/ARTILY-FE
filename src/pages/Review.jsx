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
                    images={v.images[0].imageUrl}
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
