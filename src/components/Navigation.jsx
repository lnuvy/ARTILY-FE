import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import { Flex, Icon, Text, Tab, Grid } from "../elements";

// 경로를 같이 저장해야할거같아서 Object.entries로 사용
const menuSelect = {
  홈: "/home",
  스토어: "/store",
  리뷰: "/review",
  // 마이페이지: "/myprofile",
  //4/30 pm 2:43 마이페이지 경로 이름 바꿨습니다 -영경
  마이페이지: "/mypage",
};
export const menus = Object.entries(menuSelect);

const Navigation = () => {
  // 현재 url 경로로 홈에있는지, 스토어에있는지, 리뷰에 있는지 판별
  const path = useLocation().pathname;
  const [current, setCurrent] = useState(menus[0]); // ["홈", "/home"] 이렇게 저장됨

  // 경로가 바뀔때마다 url이 포함하고있는 네비게이션 항목으로 설정
  useEffect(() => {
    const now = menus.find((l) => path.includes(l[1]));
    if (now) {
      setCurrent(now);
    }
  }, [path]);

  // 네비게이션 탭을 직접 눌렀을때
  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    console.log(innerText);
    setCurrent(menus.find((l) => l[0] === innerText));
  };

  return (
    <Grid gtc="auto auto auto auto" cg="20px">
      {menus.map((menu) => {
        return (
          <CurrentDiv
            key={menu}
            onClick={(e) => {
              handleChangeCurrent(e);
              history.push(menu[1]);
            }}
            current={menu === current}
          >
            <Nav>{menu[0]}</Nav>
          </CurrentDiv>
        );
      })}
    </Grid>
  );
};

const CurrentDiv = styled.div`
  padding: 5px 10px;
  margin: 10px 0 0;
  cursor: pointer;
  text-align: center;
  color: white;
  /* animation: all 3s ease-out; */
  border-bottom: ${({ current }) =>
    current ? `3px solid white;` : "3px solid transparent;"};
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

export default Navigation;
