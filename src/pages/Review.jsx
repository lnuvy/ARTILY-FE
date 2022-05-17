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

  useEffect(() => {
    // reset
    dispatch(getReviewData(null));
    // get
    dispatch(getReviewDB());
  }, []);

  const clickCard = (reviewId) => {
    history.push(`/review/view/${reviewId}`);
  };

  return (
    <>
      <Grid>
        <Category review />
        <Wrap margin="16px">
<<<<<<< HEAD
          <Grid gtc="1fr 1fr" margin="0 0 20px">
            {filteringList &&
              filteringList.map((v, i) => {
                return (
                  <ReviewCard
                    _key={i}
                    onClick={clickCard(v.reviewId)}
                    imageUrl={v.imageUrl[0].imageUrl}
                    {...v}
                  />
                );
              })}
=======
          <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 0 20px">
            {/* {reviewList?.length
              ? reviewList.map((l, i) => { */}
            {reviewList && filteringList
              ? filteringList.map((l, i) => {
                  return (
                    <>
                      <ReviewCard
                        _key={i}
                        nickname={l.nickname}
                        profileImage={l.profileImage}
                        {...l}
                        onClick={() => handleClickData(l)}
                        imageUrl={l.imageUrl[0]}
                      />
                    </>
                  );
                })
              : null}
>>>>>>> c464820fe369418cb1467723d066e6859f999725
          </Grid>
        </Wrap>
      </Grid>
    </>
  );
};

export default Review;
