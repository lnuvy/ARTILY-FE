import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Preview, Card } from "../components";
import ImagePreview from "../components/ImagePreview";
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Image,
  Input,
  Text,
  Textarea,
  Wrap,
} from "../elements";
import { history } from "../redux/configureStore";

import { getReviewDB } from "../redux/modules/reviews";
import { getPostDB } from "../redux/modules/store";

const ReviewSelect = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.store.list);
  const mybuyList = [];

  useEffect(() => {
    dispatch(getReviewDB());
    dispatch(getPostDB());
  }, []);

  if (user) {
    user.user.myBuy.forEach((mybuy) => {
      console.log(mybuy);
      posts.map((post) => {
        if (post.postId === mybuy) {
          console.log(post);
          mybuyList.push(post);
        }
      });
    });
  }

  return (
    <>
      <Text h1 medium textAlign="center">
        내가 구입한 작품
      </Text>

      {!mybuyList.length === 0 ? (
        mybuyList.map((l, i) => {
          return (
            <Flex>
              <Image
                width="80px"
                height="80px"
                src={`${l.imageUrl[0]}`}
              ></Image>
              <Wrap fg="1">
                <Text>{l.postTitle}</Text>
                <Text>{l.user.nickname}</Text>
              </Wrap>
              <Button onClick={() => history.push(`/review/write/${l.postId}`)}>
                리뷰쓰기
              </Button>
            </Flex>
          );
        })
      ) : (
        <>
          <Text textAlign="center">구매한 작업이 없습니다.</Text>
          <Button onClick={() => history.goBack()}>돌아가기</Button>
        </>
      )}

      {/* <Text>구매한 작품이 없으신가요?</Text>
      <Button text>판매자에게 판매 확정을 요청하기</Button> */}
    </>
  );
};

export default ReviewSelect;
