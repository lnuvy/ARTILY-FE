import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { history } from "../../redux/configureStore";

const menuSelect = {
  홈: "/home",
  스토어: "/sell",
  리뷰: "/review",
  프로필: "/myprofile",
};

export const menus = Object.entries(menuSelect);

const Navigation = () => {
  const path = useLocation().pathname;

  const [current, setCurrent] = useState(menus[0]);

  useEffect(() => {
    const now = menus.find((l) => path.includes(l[1]));
    if (now) setCurrent(now);
  }, [path]);

  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    // history.push();
    setCurrent(menus.find((l) => l[0] === innerText));
  };

  // useEffect(() => {
  //   history.push(current[1]);
  // }, [current]);

  return (
    <Container>
      {menus.map((menu) => {
        return (
          <CurrentDiv
            key={menu}
            onClick={handleChangeCurrent}
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
