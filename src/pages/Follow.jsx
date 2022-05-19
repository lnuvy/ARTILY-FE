import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid, Flex, Text, Image, Button, Icon } from "../elements";
import {
  addFollowDB,
  DeleteFollowDB,
  getFollowDB,
  getFollowerDB,
  deleteFollowerDB,
} from "../redux/modules/follow";
import { ArrowBack } from "../assets/icons";
import theme from "../styles/theme";
const Follow = () => {
  const history = useHistory();
  const getfollowList = useSelector((state) => state.user.user);
  console.log(getfollowList);
  //내가 팔로잉한 목록
  const nowfollowList = useSelector((state) => state.followUser.list);
  console.log("내가 팔로잉한 목록:", nowfollowList);
  const nowfollowerList = useSelector((state) => state.followUser.follower);
  console.log("나를 팔로우한 목록:", nowfollowerList);
  useEffect(() => {
    dispatch(getFollowerDB());
    dispatch(getFollowDB());
  }, []);

  //구현해야 할 기능
  //마이페이지 기준
  //팔로워 리스트 삭제 기능
  //outline 팔로잉 버튼 눌렀을때 다시 팔로잉버튼으로 바뀌게(그럼 리스트가 계속 남아있게 되는건가?)

  const menus = [
    `팔로워 ${getfollowList.followerCnt}명`,
    `팔로잉 ${getfollowList.followCnt}명`,
    // `팔로잉 ${getfollowList?.followCnt}명`,
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
      {current === `팔로워 ${getfollowList?.followerCnt}명` &&
        nowfollowerList?.map((follower, l) => {
          return (
            <Profile key={l}>
              <Flex>
                <Image
                  margin="0 16px 0 0"
                  width="60px"
                  height="60px"
                  bg="#ddd"
                  shadow="1px 0.5px 2px #888"
                  br="30px"
                  onClick={() => {
                    history.push(`/userprofile/${follower.userId}`); //누르면 팔로우한 유저의 프로필로 이동
                  }}
                  src={follower?.profileImage}
                ></Image>
                <Text fg="1" body2 bold margin="5px 0 10px 0">
                  {nowfollowerList.length ? follower.nickname : ""}
                </Text>
                {/* 자신의 마이페이지일 경우 삭제버튼만 존재 */}
                <DeleteBtn
                  height="38px"
                  padding="3px 17px"
                  onClick={() => {
                    dispatch(deleteFollowerDB(follower.userId));
                    // dispatch(DeleteFollowDB(follow.followId));
                  }}
                >
                  삭제
                </DeleteBtn>
                {/* 다른사람의 리스트일경우 팔로잉(나도 팔로우 누른 유저), 팔로우 버튼으로 나뉨 */}
              </Flex>
            </Profile>
          );
        })}
      {current === `팔로잉 ${getfollowList.followCnt}명` &&
        nowfollowList &&
        nowfollowList?.map((follow, l) => {
          console.log(follow);
          return (
            <Profile key={l}>
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
                  {nowfollowList.length ? follow.followName : ""}
                </Text>
                {/* 이미 팔로잉 한 상태일때 */}
                <FollowBtn
                  height="38px"
                  padding="3px 17px"
                  onClick={() => {
                    // changefollows();
                    dispatch(DeleteFollowDB(follow.followId));
                  }}
                >
                  언팔로우
                </FollowBtn>

                {/* //다른사람의 페이지 일 경우 */}
                {/* 한번 더 누르면 팔로우 버튼으로 바뀌어야함 */}
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

const DeleteBtn = styled.button`
  border-radius: 8px;
  background-color: #fff;
  color: ${({ theme }) => theme.pallete.gray2};
  border: 1px solid ${({ theme }) => theme.pallete.gray2};
  width: 73px;
  height: 38px;
`;
const FollowBtn = styled.button`
  border-radius: 8px;
  background-color: #fff;
  color: ${({ theme }) => theme.pallete.gray2};
  border: 1px solid ${({ theme }) => theme.pallete.gray2};
  width: 73px;
  height: 38px;
`;

export default Follow;
