import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Flex, Text, Image, Button } from "../elements";

const Follow = () => {
  const getProfile = useSelector((state) => state.user.user);
  console.log(getProfile);
  // const nowfollowerList = "";
  // const nowfollowList = "";
  const menus = [
    // `팔로워 ${getProfile.followerList}`,
    // `팔로잉 ${getProfile.followList}`,
    "팔로워 1명",
    "팔로잉 1명",
  ];
  const [current, setCurrent] = useState(menus[0]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
    setCurrent(menus.find((l) => l === innerText));
  };
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
      {/* 팔로워 */}
      {/* {nowfollowerList?.map((l) => { */}
      {/* if (current === "팔로잉 1명") { */}
      {/* return ( */}
      {current === "팔로워 1명" ? (
        <Profile>
          <Flex>
            <Image
              margin="0 10px"
              width="60px"
              height="60px"
              bg="#ddd"
              br="30px"
              // src={getProfile.ProfileImage}
              src=""
            ></Image>
            <Text fg="1" body2 bold margin="5px 0 10px 0">
              {getProfile && getProfile.nickname ? getProfile.nickname : ""}
            </Text>

            <Button fg="0" outline margin="0 10px 0 0" padding="10px">
              삭제
            </Button>
          </Flex>
        </Profile>
      ) : (
        ""
      )}
      {/* ); */}
      {/* } */}
      {/* })} */}

      {/* 팔로잉 */}
      {/* {nowfollowList?.map((l) => { */}
      {/* if (current === "팔로잉 1명") { */}
      {/* return ( */}
      {current === "팔로잉 1명" ? (
        <Profile>
          <Flex>
            <Image
              margin="0 10px"
              width="60px"
              height="60px"
              bg="#ddd"
              br="30px"
              // src={getProfile.ProfileImage}
              src=""
            ></Image>
            <Text fg="1" body2 bold margin="5px 0 10px 0">
              용감한 나무늘보
            </Text>
            <Button fg="0" outline margin="0 10px 0 0" padding="10px">
              팔로잉
            </Button>
            {/* 내가 팔로우를 누른 사람 */}
            <Button fg="0" margin="0 10px 0 0" padding="10px">
              팔로우
            </Button>
          </Flex>
        </Profile>
      ) : (
        ""
      )}

      {/* ); */}
      {/* } */}
      {/* })} */}
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
