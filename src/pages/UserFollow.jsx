import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Grid, Flex, Text, Image } from "../elements";
import {
  getFollowDB,
  getFollowerDB,
  getUserFollowDB,
  getUserFollowerDB,
} from "../redux/modules/follow";
const UserFollow = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const nowUserInfo = useSelector((state) => state?.mypage?.userInfo?.user);
  const currentuserId = nowUserInfo?.userId;
  // const userFollowNick = nowUserInfo?.nickname;

  const myInfo = useSelector((state) => state.user?.user);
  // console.log("내 정보 :", myInfo);

  // 리덕스정보 다가져오기
  const { myFollower, myFollowing, userfollow, userfollower } = useSelector(
    (state) => state.followUser
  );

  // console.log(myFollower, myFollowing, userfollow, userfollower);

  // 내 팔로워, 팔로우 목록 dispatch
  useEffect(() => {
    dispatch(getFollowerDB());
    dispatch(getFollowDB());
  }, []);

  useEffect(() => {
    if (!nowUserInfo) {
      history.go(-1);
    } else {
      dispatch(getUserFollowDB(currentuserId));
      dispatch(getUserFollowerDB(currentuserId));
    }
  }, [nowUserInfo]);

  const [followCnt, setFollowCnt] = useState({
    follow: nowUserInfo?.followCnt,
    follower: nowUserInfo?.followerCnt,
  });

  const menus = [`팔로워`, `팔로잉`];
  const [current, setCurrent] = useState(menus[0]);

  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    setCurrent(menus.find((l) => innerText.includes(l)));
  };

  return (
    <>
      <Grid gtc="auto auto" cg="20px" margin="10px 0 0 0">
        {menus.map((menu, i) => {
          return (
            <CurrentDiv
              key={menu}
              onClick={(e) => {
                handleChangeCurrent(e);
              }}
              current={menu === current}
            >
              <Nav>
                {menu} &nbsp;
                {i === 0 ? `${followCnt.follower}명` : `${followCnt.follow}명`}
              </Nav>
            </CurrentDiv>
          );
        })}
      </Grid>
      {/* 팔로워 */}
      {current === `팔로워` &&
        userfollower?.map((follower, l) => {
          // console.log(follower);
          return (
            <Profile key={l}>
              <Flex>
                <Image
                  margin="0 16px 0 0"
                  width="60px"
                  height="60px"
                  bg="#ddd"
                  br="30px"
                  src={follower?.profileImage}
                  onClick={() => {
                    history.push(`/userprofile/${follower.userId}`); //누르면 팔로우한 유저의 프로필로 이동
                  }}
                ></Image>

                <Text fg="1" body2 bold margin="5px 0 10px 0">
                  {userfollower?.length ? follower.nickname : ""}
                </Text>
              </Flex>
            </Profile>
          );
        })}
      {current === `팔로잉` &&
        userfollow?.map((follow, l) => {
          // console.log(follow);
          return (
            <Profile key={l} onClick={() => {}}>
              <Flex>
                <Image
                  margin="0 16px 0 0"
                  width="60px"
                  height="60px"
                  bg="#ddd"
                  br="30px"
                  src={follow?.profileImage}
                  onClick={() => {
                    history.push(`/userprofile/${follow.followId}`);
                  }}
                ></Image>
                <Text fg="1" body2 bold margin="5px 0 10px 0">
                  {userfollow?.length ? follow.followName : ""}
                </Text>
                {/* 나도 이미 팔로우가 되어있는 사람일 경우 언팔로우 버튼 */}
                {/* 리스트에 본인이 있을경우 버튼이 없음 */}
              </Flex>
            </Profile>
          );
        })}
    </>
  );
};

const CurrentDiv = styled.div`
  font-weight: bold;
  padding: 5px 10px;
  margin: 10px 0 0;
  cursor: pointer;
  text-align: center;
  /* animation: all 3s ease-out; */
  border-bottom: ${({ current, theme }) =>
    current ? `3px solid ${theme.color.brandColor}` : "3px solid transparent;"};
  &:focus {
    /* outline: none; */
  }
  // 모바일 파란박스 없애기
  -webkit-tap-highlight-color: transparent;
`;

const Nav = styled.div`
  display: grid;
  width: 100%;
`;
const Profile = styled.div`
  padding: 15px 16px;
  border-bottom: 1px solid #ddd;
`;
const FollowerBtn = styled.button`
  border-radius: 8px;
  background-color: ${(props) => (props.prev ? "#fff" : "#FD7A00")};
  color: ${(props) => (props.prev ? "#999" : "#fff")};
  border: 1px solid ${(props) => (props.prev ? "#999" : "")};
  width: 73px;
  height: 38px;
`;
const FollowBtn = styled.button`
  border-radius: 8px;
  background-color: ${(props) => (props.alreadyFollow ? "#fff" : "#FD7A00")};
  color: ${(props) => (props.alreadyFollow ? "#999" : "#fff")};
  border: 1px solid ${(props) => (props.alreadyFollow ? "#999" : "")};
  width: 73px;
  height: 38px;
`;

export default UserFollow;
