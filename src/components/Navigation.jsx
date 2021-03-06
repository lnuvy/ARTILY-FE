import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import { useSelector } from "react-redux";

// 경로를 같이 저장해야 할 거 같아서 Object.entries로 사용
const menuSelect = {
  홈: "/home",
  스토어: "/store",
  리뷰: "/review",
  마이페이지: "/mypage",
};
export const menus = Object.entries(menuSelect);

const Navigation = () => {
  // 현재 url 경로로 홈에있는지, 스토어에있는지, 리뷰에 있는지 판별
  const path = useLocation().pathname;
  const [current, setCurrent] = useState(menus[0]); // ["홈", "/home"] 이렇게 저장됨

  const isLogin = useSelector((state) => state.user.isLogin);

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

    if (innerText === "마이페이지" && !isLogin) {
      history.push("/login");
      return;
    } else {
      setCurrent(menus.find((l) => l[0] === innerText));
    }
  };

  return (
    <Grid gtc="auto auto auto auto" cg="0">
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
            {menu[0]}
          </CurrentDiv>
        );
      })}
    </Grid>
  );
};

const CurrentDiv = styled.div`
  padding: 0;
  margin: 0 auto;
  width: 100%;
  padding: 8px 16px;
  cursor: pointer;
  text-align: center;
  color: black;
  border-bottom: ${({ current, theme }) =>
    current
      ? `4px solid ${theme.color.brandColor};`
      : "4px solid transparent;"};
  -webkit-tap-highlight-color: transparent;
`;

export default Navigation;
