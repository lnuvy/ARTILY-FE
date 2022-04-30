import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {
  Flex,
  Icon,
  Text,
  Tab,
  Grid,
  Image,
  Checkbox,
  Wrap,
  ImageCarousel,
} from "../elements";
import { Card, Navigation, ArtCard } from "../components";
import { getNowPost, getPostDB } from "../redux/modules/store";
import { useParams } from "react-router-dom";

const Store = (props) => {
  const dispatch = useDispatch();
  const { postId } = useParams();

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
    size,
    content,
  } = current;
  const { userId, address, nickname, profileUrl } = user;

  const isMe = userId === currentUser?.userId;

  useEffect(() => {
    if (!current) {
      // 리덕스 데이터가 없다면 해당 게시글 가져오는 api 호출
      // dispatch()
      dispatch(getPostDB());
      dispatch(getNowPost(postId));
    }
  }, []);

  return (
    <>
      <Wrap margin="16px">
        <Text h1>{postTitle}</Text>
        <Flex margin="8px 0 0 0" jc="space-between">
          <Flex>
            <Image shape="circle" size="20" />
            <Text margin="0 0 0 4px">{nickname}</Text>
          </Flex>
          <Flex>
            {isMe ? (
              <>
                <Text body2>수정하기</Text> &nbsp;
                <Text body2>삭제하기</Text>
              </>
            ) : (
              <>
                <Text body2>팔로우</Text> &nbsp;
                <Text body2>신고</Text>
              </>
            )}
          </Flex>
        </Flex>
      </Wrap>
      <ImageCarousel src={imageUrl} />
      <Wrap margin="16px">
        <Flex>
          <Text body3 fg="1">
            분류
          </Text>
          <Text body3>{category}</Text>
        </Flex>
        <Flex>
          <Text body3 fg="1">
            크기
          </Text>
          <Text body3>{size}</Text>
        </Flex>
        <Flex margin="0 0 10px">
          <Text body3 fg="1">
            거래 방식
          </Text>
          <Text body3>{transaction}</Text>
        </Flex>
        <Text>{content}</Text>
        <Flex margin="16px 0 0 ">
          <Text h2 lineHeight="22px">
            작가의 다른 작품
          </Text>
          <Text margin="0 0 0 8px" fg="1" lineHeight="22px">
            팔로우
          </Text>
          <Text lineHeight="22px">더보기</Text>
        </Flex>
        <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px"></Grid>
      </Wrap>
    </>
  );
};

export default Store;
