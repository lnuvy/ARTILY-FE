import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Grid, Flex, Text, Image, Button } from "../elements";
import { addFollowDB } from "../redux/modules/follow";
const Follow = () => {
  const getfollowList = useSelector((state) => state.user.user);
  console.log(getfollowList);
  const nowfollowerList = useSelector((state) => state).user.user.follower;
  console.log(nowfollowerList);
  // const nowfollowList = "";
  const menus = [
    `팔로워 ${getfollowList?.followerCnt}명`,
    `팔로잉 ${getfollowList?.followCnt}명`,
  ];
  const [current, setCurrent] = useState(menus[0]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
    setCurrent(menus.find((l) => l === innerText));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addFollowDB());
  }, []);
  return (
    <>
      <Grid gtc="auto auto" cg="20px" margin="10px 0">
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
      {/* 팔로잉 */}
      {getfollowList &&
        nowfollowerList.map(() => {
          return (
            <Profile>
              <Flex>
                <Image
                  margin="0 10px"
                  width="60px"
                  height="60px"
                  bg="#ddd"
                  br="30px"
                  src=""
                ></Image>
                <Text fg="1" body2 bold margin="5px 0 10px 0">
                  {getfollowList && getfollowList.follow
                    ? getfollowList.follow
                    : ""}
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
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
`;
export default Follow;
