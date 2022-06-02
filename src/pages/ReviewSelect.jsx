import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoInfo } from "../components";
import theme from "../styles/theme";
import { Flex, Image, Text, Wrap } from "../elements";
import { history } from "../redux/configureStore";

import { getMyBuyDB } from "../redux/modules/reviews";
import styled from "styled-components";
const ReviewSelect = () => {
  const dispatch = useDispatch();
  const mybuyList = useSelector((state) => state.review?.buyList);

  useEffect(() => {
    dispatch(getMyBuyDB());
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
      {mybuyList && mybuyList.length > 0 ? (
        mybuyList.map((l, i) => {
          return (
            <Flex
              padding="16px"
              borderBottom={`1px solid ${theme.pallete.gray1}`}
            >
              <Image
                width="80px"
                height="80px"
                src={`${
                  l.images && l.images[0].imageUrl && l.images[0].imageUrl
                }`}
              ></Image>
              <Wrap fg="1" margin="0 0 0 16px">
                <Text h1 bold margin="0 0 16px">
                  {l.postTitle && l.postTitle}
                </Text>
                <Text>{l.user.nickname && l.user.nickname}</Text>
              </Wrap>
              <WriteButton
                onClick={() => history.push(`/review/write/${l.postId}`)}
              >
                리뷰 쓰기
              </WriteButton>
            </Flex>
          );
        })
      ) : (
        <>
          <NoInfo
            text1="구매한 작업이 없습니다."
            button="돌아가기"
            movePage="/mypage"
          />
        </>
      )}
    </>
  );
};

const WriteButton = styled.button`
  padding: 8px 5px;
  width: 72px;
  height: 36px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.pallete.primary850};
  color: #fff;
  margin-top: 47px;
  cursor: pointer;
`;

export default ReviewSelect;
