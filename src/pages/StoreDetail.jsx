import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Grid, Image, ImageCarousel, Text } from "../elements";

const StoreDetail = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.store.detailData);
  const currentUser = useSelector((state) => state.user.user);

  const {
    user,
    category,
    createdAt,
    imageUrl,
    markupCnt,
    postTitle,
    price,
    transaction,
  } = current;
  const { userId, address, nickname, profileUrl } = user;

  const isMe = userId === currentUser?.userId;

  useEffect(() => {
    if (!current) {
      // 리덕스 데이터가 없다면 해당 게시글 가져오는 api 호출
      // dispatch()
    }
  }, []);

  return (
    <Grid>
      <Flex padding="0 12px" jc="space-between">
        <Flex>
          <Image shape="circle" />
          <Text h2 margin="0 8px">
            {nickname}
          </Text>
        </Flex>
        <Flex>
          {isMe ? (
            <>
              <Text h2>수정하기</Text>
              <Text h2>삭제하기</Text>
            </>
          ) : (
            <>
              <Text h2>팔로우</Text>
              <Text h2>신고</Text>
            </>
          )}
        </Flex>
      </Flex>
      <ImageCarousel src={imageUrl} />
      <Flex jc="space-between" padding="0 12px" margin="10px 0">
        <Text h1 color="gray">
          분류
        </Text>
        <Text h1>{category}</Text>
      </Flex>
    </Grid>
  );
};

export default StoreDetail;
