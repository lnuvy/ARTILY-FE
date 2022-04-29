import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { history } from "../../redux/configureStore";
import { fetchMessage } from "../../redux/modules/ToastMessage";

// 경로를 같이 저장해야할거같아서 Object.entries로 사용
const menuSelect = {
  홈: "/home",
  스토어: "/store",
  리뷰: "/review",
  프로필: "/myprofile",
};
export const menus = Object.entries(menuSelect);

const Navigation = () => {
  const dispatch = useDispatch();
  // 현재 url 경로
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
    setCurrent(menus.find((l) => l[0] === innerText));
  };

  return (
    <Container>
      {menus.map((menu) => {
        return (
          <CurrentDiv
            key={menu}
            onClick={(e) => {
              // dispatch(fetchMessage({ Message: true, text: "안녕하세요" }));
              handleChangeCurrent(e);
              history.push(menu[1]);
            }}
            current={menu === current}
          >
            <Nav>{menu[0]}</Nav>
          </CurrentDiv>
        );
      })}
    </Container>
  );
};

/*
const slide = keyframes`
  0% {

  }
  100% {
    position: relative;
    left: 100px;
  }
`;
*/

const Container = styled.nav`
  position: fixed;
  top: 0%;
  z-index: 15;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 0 30px;
  background-color: gray;
`;

const CurrentDiv = styled.div`
  padding: 0 10px;
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
  /* width: calc(89%); */
  width: fit-content;
  padding: 5px 0;
  cursor: pointer;
  margin: 10px 0 0;
  color: white;
`;

export default Navigation;
