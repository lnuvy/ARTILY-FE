import React, { useEffect, useState } from "react";
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
  Icon,
} from "../elements";
import { FavoriteFilled, Favorite } from "../assets/icons/index";

import {
  deletePostDB,
  getPostOne,
  go2detail,
  otherPost,
  filteringData,
  getMyPostLikeDB,
  postMyPostLikeDB,
} from "../redux/modules/store";

import { getFollowDB } from "../redux/modules/follow";

import { addFollowDB } from "../redux/modules/follow";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { priceComma } from "../shared/utils";
import theme from "../styles/theme";
import SellLabel from "../components/SellLabel";
import { deleteSwal } from "../shared/commonAlert";
import { NoInfo } from "../components";
// 임시 아이콘
import { IoMdHeart } from "react-icons/io";

// 채팅
import { socket } from "../shared/socket";
import { makeChatRoom } from "../redux/modules/chat";
import { postMarkupToggle } from "../redux/modules/user";
import { FollowCheck, StoreMore } from "../components";

const StoreDetail = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  // 할당
  const detailData = useSelector((state) => state.store.detailData);
  const currentUser = useSelector((state) => state.user?.user);
  const otherPosts = useSelector((state) => state.store.otherPost);
  const myFollowList = useSelector((state) => state.followUser.myFollowing);

  const { chatData } = useSelector((state) => state.chat);
  const likeThisPost = useSelector((state) => state.store.myPostLike);

  const followInfo = detailData?.user;
  const isMe = detailData?.user?.userId === currentUser?.userId;
  const [nowFollowing, setNowFollowing] = useState(false);
  const likeThisPostList = useSelector((state) => state.store.myPostLikeList);

  const [myLike, setMyLike] = useState(undefined);
  const [myLikeCount, setMyLikeCount] = useState(undefined);

  // reset
  useEffect(() => {
    dispatch(go2detail([]));
    dispatch(otherPost([]));
    dispatch(filteringData("전체"));
  }, []);

  useEffect(() => {
    dispatch(getMyPostLikeDB());
  }, []);

  const isMyMarkup = likeThisPostList?.find((v) => v === postId) ? true : false;

  useEffect(() => {
    dispatch(getPostOne(postId));
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(getFollowDB());
    }
  }, [currentUser]);

  useEffect(() => {
    const result =
      myFollowList?.find((u) => u.followId === detailData?.user?.userId) ||
      false;
    if (result) {
      setNowFollowing(true);
    }
  }, [detailData]);

  // func
  const deletePosting = async () => {
    const result = await deleteSwal();
    console.log(result);
    if (result) {
      dispatch(deletePostDB(postId));
    }
  };

  useEffect(() => {
    setMyLike(detailData && isMyMarkup);
    setMyLikeCount(detailData && detailData.markupCnt);
  }, []);

  // 팔로우
  const clickFollowbtn = () => {
    if (!currentUser) {
      alert("로그인하세요");
      return;
    }
    const userData = {
      followId: followInfo.userId,
      followName: followInfo.nickname,
      profileImage: followInfo.profileImage,
    };

    dispatch(addFollowDB(userData));
    setNowFollowing(!nowFollowing);
  };

  // 찜하기
  const markupToggle = () => {
    if (!currentUser) {
      alert("로그인해주세요");
      return;
    }
    dispatch(postMyPostLikeDB(postId));
  };

  // 더보기
  const moveToProfile = (userId) => {
    // if (userId === currentUser.userId) {
    //   history.push(`/mypage`);
    // }
    history.push(`/userprofile/${userId}`);
  };

  // 채팅하기 버튼 눌렀을때
  const startChat = () => {
    if (!currentUser) {
      alert("로그인해주세요");
      return;
    }
    const postUser = detailData.user;
    const nowUser = currentUser?.userId;
    let roomName = `from${nowUser}_to${postUser.userId}_${postId}`;

    if (chatData.chatRoom?.length > 0) {
      const isExistRoom = chatData.chatRoom.find(
        (room) => room.roomName === roomName
      );
      if (isExistRoom) {
        history.push(`/chat/${roomName}`);
        return;
      }
    }

    const chatPostData = {
      postId,
      imageUrl: detailData.images[0]?.imageUrl,
      postTitle: detailData.postTitle,
      price: detailData.price,
      done: detailData.done,
    };

    const targetUser = {
      userId: detailData.user.userId,
      nickname: detailData.user.nickname,
      profileImage: detailData.user.profileImage,
      connected: null,
    };

    socket.emit("join_room", roomName, postUser, chatPostData);
    dispatch(
      makeChatRoom({
        roomName,
        post: chatPostData,
        targetUser,
        newMessage: 0,
        lastMessage: null,
        lastTime: null,
        createUser: currentUser,
      })
    );

    history.push(`/chat/${roomName}`);
  };

  return (
    <>
      {detailData && (
        <>
          <Wrap margin="0 16px">
            <Flex>
              <Text h1 medium>
                {detailData.postTitle}
              </Text>
              <SellLabel complete3 />
            </Flex>
            <Flex margin="10px 0 6px" jc="space-between">
              {/* 5.18 cursor:pointer를 위한 style-components 추가 */}
              <ProfileBtn
                onClick={() => {
                  //내 글일경우 마이페이지로 이동
                  if (detailData.user.userId === currentUser.userId) {
                    history.push(`/mypage`);
                  } else {
                    history.push(`/userprofile/${detailData.user.userId}`);
                  }
                }}
              >
                <Flex>
                  <Image
                    circle
                    size="32"
                    src={detailData?.user?.profileImage}
                    border="1px solid #eee"
                  />
                  <Text margin="0 0 0 8px">{detailData?.user?.nickname}</Text>
                </Flex>
              </ProfileBtn>
              <Flex>
                {isMe ? (
                  <>
                    <Flex
                      padding="6px"
                      onClick={() => {
                        console.log("수정");
                        history.push(`/store/edit/${postId}`);
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
                    <Flex padding="6px" onClick={clickFollowbtn}>
                      <FollowCheck text follow={nowFollowing} />
                    </Flex>
                    {/* <Flex
                      padding="0"
                      margin="0 0 0 6px"
                      onClick={() => {
                        console.log("신고하기");
                      }}
                    >
                      <Text body1 color={theme.pallete.primary900}>
                        신고
                      </Text>
                    </Flex> */}
                  </>
                )}
              </Flex>
            </Flex>
          </Wrap>
          <ImageCarousel src={detailData.images} />

          <Wrap margin="16px 16px 64px">
            <Flex margin="8px 0" jc="space-between">
              <Text color={theme.pallete.gray3}>분류</Text>
              <Text color={theme.pallete.gray3}>{detailData?.category}</Text>
            </Flex>

            <Flex margin="8px 0 10px" jc="space-between">
              <Text color={theme.pallete.gray3}>거래 방식</Text>
              <Text color={theme.pallete.gray3}>
                {detailData?.transaction}
                {detailData?.changeAddress && ` ∙ ${detailData?.changeAddress}`}
              </Text>
            </Flex>
            <Flex>
              <Text color="black" margin="0 0 16px">
                {detailData?.postContent}
              </Text>
            </Flex>
            {otherPosts && (
              <>
                <Flex margin="4px 0 10px">
                  <Text h2 lineHeight="22px">
                    {detailData?.user?.nickname}의 다른 작품
                  </Text>

                  {isMe ? (
                    <>
                      <Wrap fg="1"></Wrap>
                      <Text lineHeight="22px">
                        <Button
                          fontSize="16px"
                          color={`${theme.color.brandColor}`}
                          text
                          onClick={() =>
                            moveToProfile(otherPosts[0].user.userId)
                          }
                        >
                          더보기
                        </Button>
                      </Text>
                    </>
                  ) : (
                    <>
                      <Wrap margin="0 0 0 4px" fg="1">
                        <Flex padding="6px" onClick={clickFollowbtn}>
                          <FollowCheck text follow={nowFollowing} />
                        </Flex>
                      </Wrap>
                      <Text lineHeight="22px">
                        <Button
                          fontSize="16px"
                          color={`${theme.color.brandColor}`}
                          text
                          padding="0"
                          onClick={() =>
                            moveToProfile(otherPosts[0].user.userId)
                          }
                        >
                          더보기
                        </Button>
                      </Text>
                    </>
                  )}
                </Flex>
                <NoInfo
                  list={otherPosts}
                  text1="아직 작가의 다른 작품이 없어요."
                  text2="다른 작가의 작품을 구경해보시겠어요?"
                  underlineBtn="스토어로 이동"
                  movePage="/store"
                >
                  <Grid gtc="1fr 1fr" rg="18px" cg="8px" margin="0 0 20px">
                    {otherPosts.map((post) => {
                      return (
                        <StoreMore
                          key={post.postId}
                          {...post}
                          onClick={() => {
                            history.push(`/store/view/${post.postId}`);
                            history.go(0);
                          }}
                        />
                      );
                    })}
                  </Grid>
                </NoInfo>
              </>
            )}
          </Wrap>

          <FixedChatBar>
            <Flex>
              <Button text padding="0" onClick={markupToggle}>
                <Flex>
                  {detailData && likeThisPostList?.find((v) => v === postId) ? (
                    <FavoriteFilled color={theme.pallete.primary850} />
                  ) : (
                    <Favorite color={theme.pallete.primary850} />
                  )}
                  <Text
                    h3
                    medium
                    margin="0 0 0 4px"
                    color={theme.pallete.gray3}
                  >
                    {detailData && detailData.markupCnt}
                  </Text>
                </Flex>
              </Button>

              <Text h3 medium margin="0 20px">
                {detailData.price ? priceComma(detailData.price) : 0} 원
              </Text>
            </Flex>
            <Flex jc="end">
              {currentUser && isMe ? (
                <Button padding="8px 16px">
                  <Text color="white">판매완료로 변경</Text>
                </Button>
              ) : currentUser && !isMe ? (
                <Button padding="12px 16px" onClick={startChat}>
                  채팅하기
                </Button>
              ) : (
                <Button
                  padding="12px 16px"
                  onClick={() => history.push("/mypage")}
                >
                  로그인
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
const ProfileBtn = styled.div`
  cursor: pointer;
`;
export default StoreDetail;
