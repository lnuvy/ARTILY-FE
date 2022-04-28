import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

// const menus = ["홈", "스토어", "리뷰", "프로필"];

const menuSelect = {
  홈: "/",
  스토어: "/sell",
  리뷰: "/review",
  프로필: "/myprofile",
};

const menus = Object.entries(menuSelect);

const Navigation = () => {
  const [current, setCurrent] = useState(menus[0]);

  const handleChangeCurrent = (e) => {
    const { innerText } = e.target;
    setCurrent(menus.find((l) => l[0] === innerText));
  };

  useEffect(() => {
    history.push(current[1]);
  }, [current]);

  return (
    <Container>
      {menus.map((menu, i) => {
        return (
          <CurrentDiv
            key={`${i}_${menu}`}
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
