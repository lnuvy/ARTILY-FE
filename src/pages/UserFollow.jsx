import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid, Flex, Text, Image, Button, Icon } from "../elements";
import { getmyPageData, getUserPageData } from "../redux/modules/mypage";
import {
  getFollowDB,
  getFollowerDB,
  getUserFollowDB,
  getUserFollowerDB,
} from "../redux/modules/follow";
import { ArrowBack } from "../assets/icons";
const UserFollow = () => {
  const history = useHistory();
  //내 팔로워 목록
  const myfollower = useSelector((state) => state.followUser.follower);
  console.log("내 팔로워 목록", myfollower);
  //내 팔로우 목록
  const myfollow = useSelector((state) => state.followUser.list);
  console.log("내 팔로잉 목록", myfollow);

  const nowUserInfo = useSelector((state) => state?.mypage?.userInfo?.user);
  console.log(nowUserInfo);
  const userId = useSelector((state) => state?.mypage?.userInfo?.user?.userId);
  console.log("유저 아이디!!!", userId);

  //유저 팔로우 목록
  const nowfollowList = useSelector((state) => state?.followUser?.userfollow);
  console.log("유저 팔로잉 리스트", nowfollowList);

  //유저 팔로워 목록
  const nowfollowerList = useSelector((state) => state.followUser).userfollower;
  console.log("유저 팔로워 리스트", nowfollowerList);

  // 내 팔로워, 팔로우 목록 dispatch
  useEffect(() => {
    dispatch(getFollowerDB());
    dispatch(getFollowDB());
  }, []);

  useEffect(() => {
    if (!userId) {
      history.go(-1); //새로고침 되면 뒤로 돌아가도록 설정
    } else {
      dispatch(getUserFollowDB(userId));
      dispatch(getUserFollowerDB(userId));
    }
  }, [userId]);

  const menus = [
    `팔로워 ${nowUserInfo?.followerCnt}명`,
    `팔로잉 ${nowUserInfo?.followCnt}명`,
  ];
  const [current, setCurrent] = useState(menus[0]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    setCurrent(menus.find((l) => l === innerText));
  };
  const dispatch = useDispatch();

  return (
    <>
      <Grid gtc="auto auto" cg="20px" margin="10px 0 0 0">
        {menus.map((menu) => {
          return (
            <CurrentDiv
              key={menu}
              onClick={(e) => {
                handleChangeCurrent(e);
              }}
              current={menu === current}
            >
              <Nav>{menu}</Nav>
            </CurrentDiv>
          );
        })}
      </Grid>
      {/* 팔로워 */}
      {current === `팔로워 ${nowUserInfo?.followerCnt}명` &&
        nowfollowerList?.map((follower, l) => {
          return (
            <Profile
              key={l}
              onClick={() => {
                history.push(`/userprofile/${follower.userId}`); //누르면 팔로우한 유저의 프로필로 이동
              }}
            >
              <Flex>
                <Image
                  margin="0 16px 0 0"
                  width="60px"
                  height="60px"
                  bg="#ddd"
                  shadow="1px 0.5px 2px #888"
                  br="30px"
                  src={follower?.profileImage}
                ></Image>
                <Text fg="1" body2 bold margin="5px 0 10px 0">
                  {nowfollowerList?.length ? follower.nickname : ""}
                </Text>
                {/* 나도 이미 팔로우가 되어있는 사람일 경우 버튼 비활성화 */}
                {/* 나도 팔로우가 안되어있는 사람일 경우 팔로우 버튼 활성화 */}
                <AlreadyBtn height="38px" padding="3px 17px">
                  팔로잉
                </AlreadyBtn>
                <FollowBtn height="38px" padding="3px 17px">
                  팔로우
                </FollowBtn>
              </Flex>
            </Profile>
          );
        })}
      {current === `팔로잉 ${nowUserInfo?.followCnt}명` &&
        nowfollowList?.map((follow, l) => {
          console.log(follow);
          return (
            <Profile key={l} onClick={() => {}}>
              <Flex>
                <Image
                  margin="0 16px 0 0"
                  width="60px"
                  height="60px"
                  bg="#ddd"
                  shadow="1px 0.5px 2px #888"
                  br="30px"
                  src={follow?.profileImage}
                  onClick={() => {
                    history.push(`/userprofile/${follow.followId}`);
                  }}
                ></Image>
                <Text fg="1" body2 bold margin="5px 0 10px 0">
                  {nowfollowList?.length ? follow.followName : ""}
                </Text>
                {/* 나도 이미 팔로우가 되어있는 사람일 경우 버튼 비활성화 */}
                {/* 나도 팔로우가 안되어있는 사람일 경우 팔로우 버튼 활성화 */}
                {/* 내 팔로우 목록에 있는 사람이면 버튼 비활성화 */}
                <AlreadyBtn height="38px" padding="3px 17px">
                  팔로잉
                </AlreadyBtn>
                <FollowBtn height="38px" padding="3px 17px">
                  팔로우
                </FollowBtn>
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
const AlreadyBtn = styled.button`
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.pallete.gray2};
  width: 73px;
  height: 38px;
`;
const FollowBtn = styled.button`
  border-radius: 8px;
  color: #fff;
  background-color: ${({ theme }) => theme.pallete.primary850};
  width: 73px;
  height: 38px;
`;

export default UserFollow;
