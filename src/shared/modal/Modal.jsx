import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Flex, Grid, Text } from "../../elements";
import ModalPortal from "./Portals";

const Modal = () => {
  const modal = useSelector((state) => state.modal);

  return (
    <ModalPortal>
      <Flex fd="column">
        <Flex padding="20px 0">
          <Text h1 bold>
            {modal.title}
          </Text>
        </Flex>
        {modal.content}
      </Flex>
    </ModalPortal>
  );
};

export default Modal;
