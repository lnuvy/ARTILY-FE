import React, { useEffect, useState } from "react";
import { ArtCard, Card, ReviewCard } from "../components";
import Category from "../components/Category";
import { Button, Checkbox, Flex, Grid, Input, Text, Wrap } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getReview, go2detail } from "../redux/modules/reviews";

import { history } from "../redux/configureStore";

import { AiOutlineSearch } from "react-icons/ai";

const Review = () => {
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.review.list);

  useEffect(() => {
    // 더미데이터 주입된상태
    dispatch(getReview());
  }, []);

  const handleClickData = (data) => {
    console.log(data.reviewId);
    dispatch(go2detail(data));
    history.push(`/review/view/${data.reviewId}`);
  };

  const [freeList, setFreeList] = useState([]);

  return (
    <>
      <Grid>
        <Category />
        <Wrap margin="16px">
          <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
            {/* <ReviewCard reviewTitle="이거다" reviewContent="조아" /> */}
            {reviewList.length
              ? reviewList.map((l, i) => {
                  return (
                    <ReviewCard
                      _key={i}
                      nickname={l.nickname}
                      {...l}
                      onClick={() => handleClickData(l)}
                      imageUrl={l.imageUrl[0]}
                    />
                  );
                })
              : null}
          </Grid>
        </Wrap>
      </Grid>
      <Button onClick={() => history.push("/store/write")}>글쓰기</Button>
    </>
  );
};

export default Review;
