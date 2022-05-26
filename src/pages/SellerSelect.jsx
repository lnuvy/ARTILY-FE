import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Preview, Card } from "../components";
import ImagePreview from "../components/ImagePreview";
import theme from "../styles/theme";
import { Button, Flex, Image, Text, Wrap } from "../elements";
import { history } from "../redux/configureStore";

import { getReviewDB, getBuyList } from "../redux/modules/reviews";
import { getPostDB } from "../redux/modules/store";

const SellerSelect = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const posts = useSelector((state) => state.store.list);

  const mybuyList = [];
  // const mybuyList = useSelector((state) => state.user.user.myBuy);

  function myBuyListCheck() {
    if (user.isLogin === true) {
      user.user.myBuy.forEach((mybuy) => {
        posts.map((post) => {
          if (post.postId === mybuy) {
            // console.log(post);
            dispatch(getBuyList(post));
            // mybuyList.push(post);
          }
        });
      });
    }
  }

  useEffect(() => {
    // dispatch(getReviewDB());
    // dispatch(getPostDB());
  }, []);

  return (
    <>
      <Wrap
        padding="16px 17px 8px"
        borderBottom={`1px solid ${theme.pallete.gray1}`}
      >
        <Text h1 medium>
          내가 구입한 작품
        </Text>
      </Wrap>

      {mybuyList.length === !0 ? (
        mybuyList.map((l, i) => {
          return (
            <Flex
              padding="16px"
              borderBottom={`1px solid ${theme.pallete.gray1}`}
            >
              <Image
                width="80px"
                height="80px"
                src={`${l.imageUrl && l.imageUrl[0]}`}
              ></Image>
              <Wrap fg="1" margin="0 0 0 16px">
                <Text h1 bold margin="0 0 16px">
                  {l.postTitle && l.postTitle}
                </Text>
                <Text>{l.user.nickname && l.user.nickname}</Text>
              </Wrap>
              <Button
                padding="8px 8px 9px"
                onClick={() => history.push(`/review/write/${l.postId}`)}
              >
                리뷰쓰기
              </Button>
            </Flex>
          );
        })
      ) : (
        <>
          <Text textAlign="center" margin="160px 0 0">
            구매한 작업이 없습니다.
          </Text>
          <Wrap margin="16px auto 0" width="fit-content">
            <Button onClick={() => history.goBack()}>돌아가기</Button>
          </Wrap>
        </>
      )}
    </>
  );
};

export default SellerSelect;
