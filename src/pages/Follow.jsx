import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Grid, Flex, Text, Image } from "../elements";
import {
  addFollowDB,
  getFollowDB,
  getFollowerDB,
  deleteFollowerDB,
} from "../redux/modules/follow";
import { NoInfo } from "../components";
const Follow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.user.user);

  //내가 팔로잉한 목록
  const nowfollowList = useSelector((state) => state.followUser.myFollowing);
  // console.log("내가 팔로잉한 목록:", nowfollowList);
  const nowfollowerList = useSelector((state) => state.followUser.myFollower);
  // console.log("나를 팔로우한 목록:", nowfollowerList);
  useEffect(() => {
    dispatch(getFollowerDB());
    dispatch(getFollowDB());
  }, []);

  const [followCnt, setFollowCnt] = useState({
    follow: userInfo.followCnt,
    follower: userInfo.followerCnt,
  });
  const menus = [`팔로워`, `팔로잉`];
  const [current, setCurrent] = useState(menus[0]);

  const deleteMyFollower = (follower) => {
    console.log(follower);
    const result = window.confirm(`${follower.nickname} 팔로워를 삭제할까요?`);

    if (result) {
      dispatch(deleteFollowerDB(follower));
      setFollowCnt({ ...followCnt, follower: followCnt.follower - 1 });
    }
  };

  const unfollow = (follow) => {
    const result = window.confirm(`${follow.followName} 팔로우 취소할까요?`);

    if (result) {
      dispatch(addFollowDB(follow));
      setFollowCnt({ ...followCnt, follow: followCnt.follow - 1 });
      // (messages) => [...messages, messageData]
    }
  };

  // 네비게이션 탭을 직접 눌렀을때
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
              onClick={handleChangeCurrent}
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
                <DeleteBtn
                  height="38px"
                  padding="3px 17px"
                  onClick={() => deleteMyFollower(follower)}
                >
                  삭제
                </DeleteBtn>
              </Flex>
            </Profile>
          );
        })}

      {current === `팔로잉` &&
        nowfollowList?.map((follow, l) => {
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
                  onClick={() => unfollow(follow)}
                >
                  언팔로우
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
