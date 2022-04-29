import React, { useEffect } from "react";
import { Flex, Image, Text } from "../elements";
import Container from "../elements/Container";
import styled from "styled-components";
import ScrollMenu from "react-horizontal-scrolling-menu";
import Grid from "../elements/Grid";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <React.Fragment>
      <div>Home</div>
      <button
        onClick={() => {
          history.push("/login");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          history.push("/location");
        }}
      >
        주소 설정
      </button>
    </React.Fragment>
  );
};

export default Home;
