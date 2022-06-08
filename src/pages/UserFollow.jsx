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

  const { userfollow, userfollower } = useSelector((state) => state.followUser);

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
      {current === `팔로워` &&
        userfollower?.map((follower, l) => {
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
                    history.push(`/userprofile/${follower.userId}`);
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
  border-bottom: ${({ current, theme }) =>
    current ? `3px solid ${theme.color.brandColor}` : "3px solid transparent;"};
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

export default UserFollow;
