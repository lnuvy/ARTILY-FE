import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import { menus } from "./Navigation";
import { IoIosArrowBack } from "react-icons/io";
import { Flex } from "../../elements";
import { history } from "../../redux/configureStore";

const Header = () => {
  const path = useLocation().pathname;
  const [title, setTitle] = useState("");

  useEffect(() => {}, [path]);

  // const user = useSelector((state) => state.user);

  return (
    <Container>
      <Flex jc="start" onClick={() => history.goBack()}>
        <IoIosArrowBack />
      </Flex>
      <Grid>{title}</Grid>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 20%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 10px 30px;
  background-color: gray;
`;

export default Header;
