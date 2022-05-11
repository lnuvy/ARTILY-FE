import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import {
  Flex,
  Text,
  Grid,
  Image,
  Wrap,
  ImageCarousel,
  Button,
} from "../elements";
import {
  deletePostDB,
  getNowPost,
  getPostDB,
  getPostOne,
} from "../redux/modules/store";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { priceComma } from "../shared/utils";
import theme from "../styles/theme";

// 임시 아이콘
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

// 채팅
import { socket } from "../shared/socket";
import { receiveChatRoom } from "../redux/modules/chat";
import { postMarkupToggle } from "../redux/modules/user";

const StoreDetail = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  //5.11 다른사람 마이페이지 조회할 userId -영경
  const { userId } = useParams();
  console.log({ userId });

  const current = useSelector((state) => state.store.detailData);
  const currentUser = useSelector((state) => state.user?.user);

  useEffect(() => {
    dispatch(getPostOne(postId));
  }, []);

  const isMe = current?.user?.userId === currentUser?.userId;

  // 찜하기
  const markupToggle = () => {
    if (currentUser && !isMe) {
      dispatch(postMarkupToggle(postId));
    }
  };

  // 채팅하기 버튼 눌렀을때
  const startChat = () => {
    const postUser = current.user?.userId;
    const nowUser = currentUser?.userId;

    let roomName = `from${nowUser}_to${postUser}_${postId}`;

    const chatPostData = {
      postId,
      imageUrl: current.imageUrl[0],
      postTitle: current.postTitle,
      price: current.price,
      // TODO: 판매중/판매완료 상태 추가
    };

    socket.emit("join_room", roomName, postUser, chatPostData);

    dispatch(
      receiveChatRoom({
        roomName,
        target: postUser,
        post: chatPostData,
        nickname: current.user.nickname,
        profileImage: current.user.profileImage,
        messages: [],
        newMessage: 0,
        lastMessage: null,
        lastTime: null,
      })
    );
    history.push(`/chat/${roomName}`);
  };

  return (
    <>
      {current && (
        <>
          <Wrap margin="16px">
            <Text h1>{current.postTitle}</Text>
            <Flex margin="8px 0 0 0" jc="space-between">
              <Flex>
                <Image
                  circle
                  size="32"
                  src={current.user.profileImage}
                  onClick={() => {
                    history.push(`/mypage/${current.user.userId}`);
                  }}
                />
                <Text margin="0 0 0 4px">{current.user.nickname}</Text>
              </Flex>
              <Flex>
                {isMe ? (
                  <>
                    <Flex
                      padding="6px"
                      onClick={() => {
                        console.log("수정");
                        history.push(`/store/write/${postId}`);
                      }}
                    >
                      <Text body1 color={theme.pallete.primary900}>
                        수정하기
                      </Text>
                    </Flex>
                    <Flex
                      padding="6px"
                      onClick={() => {
                        console.log("삭제", postId);
                        dispatch(deletePostDB(postId));
                      }}
                    >
                      <Text body1 color={theme.pallete.primary900}>
                        삭제하기
                      </Text>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Text body1 color={theme.pallete.primary900}>
                      팔로우
                    </Text>

                    <Text body1 color={theme.pallete.primary900}>
                      신고
                    </Text>
                  </>
                )}
              </Flex>
            </Flex>
          </Wrap>
          <ImageCarousel src={current.imageUrl} />

          <Wrap margin="16px">
            <Flex>
              <Text body3 fg="1">
                분류
              </Text>
              <Text body3>{current.category}</Text>
            </Flex>
            <Flex>
              <Text body3 fg="1">
                크기
              </Text>
              <Text body3>{current.size}</Text>
            </Flex>
            <Flex margin="0 0 10px">
              <Text body3 fg="1">
                거래 방식
              </Text>
              <Text body3>
                {current.transaction} ∙ {current.changeAddress}
              </Text>
            </Flex>
            <Text>{current.postContent}</Text>
            {/* <Flex margin="16px 0 0 ">
              <Text h2 lineHeight="22px">
                작가의 다른 작품
              </Text>
              <Text margin="0 0 0 8px" fg="1" lineHeight="22px">
                팔로우
              </Text>
              <Text lineHeight="22px">더보기</Text>
            </Flex>
            <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px"></Grid> */}
          </Wrap>

          <FixedChatBar>
            <Flex onClick={markupToggle}>
              {currentUser &&
              currentUser.myMarkup.find((id) => id === postId) ? (
                <IoMdHeart size={36} color="red" />
              ) : (
                <IoMdHeartEmpty size={36} color="red" />
              )}

              <Text h1>{current.markupCnt}</Text>
            </Flex>
            <Flex jc="end">
              <Text h1 bold margin="0 10px">
                {priceComma(current.price)}원
              </Text>
              {isMe ? (
                <Button>판매완료</Button>
              ) : (
                <Button onClick={startChat}>채팅하기</Button>
              )}
            </Flex>
          </FixedChatBar>
        </>
      )}
    </>
  );
};

const FixedChatBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 12px;
  border-top: 1px solid gray;
  max-width: ${theme.view.maxWidth}; ;
`;

export default StoreDetail;
