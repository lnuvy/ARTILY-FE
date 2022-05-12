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

import { deleteSwal } from "../shared/commonAlert";

// 임시 아이콘
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

// 채팅
import { socket } from "../shared/socket";
import { receiveChatRoom } from "../redux/modules/chat";
import { postMarkupToggle } from "../redux/modules/user";
import { Heart } from "../assets/icons";
import { StoreMore } from "../components";

const StoreDetail = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const current = useSelector((state) => state.store.detailData);
  const currentUser = useSelector((state) => state.user?.user);
  const otherPost = useSelector((state) => state.store.otherPost);

  useEffect(() => {
    dispatch(getPostOne(postId));
  }, []);

  const isMe = current?.user?.userId === currentUser?.userId;

  const deletePosting = async () => {
    const result = await deleteSwal();
    console.log(result);
    if (result) {
      dispatch(deletePostDB(postId));
    }
  };

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
          <Wrap margin="0 16px">
            <Text h1>{current.postTitle}</Text>
            <Flex margin="8px 0" jc="space-between">
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
                    <Flex padding="6px 0 6px 6px" onClick={deletePosting}>
                      <Text body1 color={theme.pallete.primary900}>
                        삭제하기
                      </Text>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex
                      padding="6px"
                      onClick={() => {
                        console.log("팔로우 하기");
                      }}
                    >
                      <Text body1 color={theme.pallete.primary900}>
                        팔로우
                      </Text>
                    </Flex>
                    <Flex
                      padding="6px"
                      onClick={() => {
                        console.log("신고하기");
                      }}
                    >
                      <Text body1 color={theme.pallete.primary900}>
                        신고
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>
            </Flex>
          </Wrap>
          <ImageCarousel src={current.imageUrl} />

          <Wrap margin="16px 16px 56px">
            <Flex margin="8px 0" jc="space-between">
              <Text color={theme.pallete.gray3}>분류</Text>
              <Text color={theme.pallete.gray3}>{current.category}</Text>
            </Flex>
            {/* <Flex  margin="8px 0" jc="space-between">
              <Text color={theme.pallete.gray3}>
                크기
              </Text>
              <Text color={theme.pallete.gray3}>{current.size}</Text>
            </Flex> */}
            <Flex margin="8px 0 10px" jc="space-between">
              <Text color={theme.pallete.gray3}>거래 방식</Text>
              <Text color={theme.pallete.gray3}>
                {current.transaction}
                {current.changeAddress && ` ∙ ${current.changeAddress}`}
              </Text>
            </Flex>
            <Flex>
              <Text color="black" margin="0 0 16px">
                {current.postContent}
              </Text>
            </Flex>
            {otherPost.length > 0 && (
              <>
                <Flex margin="16px 0 10px">
                  <Text h2 lineHeight="22px">
                    작가의 다른 작품
                  </Text>
                  <Text
                    margin="0 0 0 14px"
                    fg="1"
                    lineHeight="22px"
                    color={theme.pallete.primary900}
                  >
                    팔로우
                  </Text>
                  <Text lineHeight="22px" color={theme.pallete.primary900}>
                    더보기
                  </Text>
                </Flex>
                <Grid gtc="1fr 1fr" rg="18px" cg="8px" margin="0 0 20px">
                  {otherPost.map((post) => {
                    return <StoreMore key={post.postId} {...post} />;
                  })}
                </Grid>
              </>
            )}
          </Wrap>

          <FixedChatBar>
            <Flex onClick={markupToggle}>
              {currentUser &&
              currentUser.myMarkup.find((id) => id === postId) ? (
                <IoMdHeart size={24} color={theme.pallete.primary850} />
              ) : (
                <Heart />
              )}

              <Text h3 medium margin="0 0 0 4px" color={theme.pallete.gray3}>
                {current.markupCnt}
              </Text>
              <Text h3 medium margin="0 20px">
                {current.price && priceComma(current.price)}원
              </Text>
            </Flex>
            <Flex jc="end">
              {isMe ? (
                <Button padding="8px 16px">
                  <Text color="white">판매완료로 변경</Text>
                </Button>
              ) : (
                <Button padding="12px 16px" onClick={startChat}>
                  채팅하기
                </Button>
              )}
            </Flex>
          </FixedChatBar>
        </>
      )}
    </>
  );
};

const FixedChatBar = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 8px 16px;
  border-top: 1px solid ${theme.pallete.gray1};
  max-width: ${theme.view.maxWidth};
  height: 56px;
`;

export default StoreDetail;
