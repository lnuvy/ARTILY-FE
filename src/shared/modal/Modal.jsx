import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Flex, Grid, Icon, Text, Wrap } from "../../elements";
import ModalPortal from "./Portals";

// X 아이콘
import { Close } from "../../assets/icons";
import { IoCloseOutline } from "react-icons/io5";
import { closeModal } from "../../redux/modules/modal";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  const modalClose = () => {
    dispatch(closeModal());
  };

  // 모달 띄웠을때 배경 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <ModalPortal>
      <Flex fd="column" margin="0" width="100%" height="fit-content">
        <Flex
          width="100%"
          padding="16px 16px 0px"
          height="fit-content"
          jc="space-between"
        >
          {/* <Text h1 bold>
            {modal.title}
          </Text> */}
          {/* <Icon onClick={modalClose}>
            <Close />
          </Icon> */}
        </Flex>
        <ContentWrap>{modal.content}</ContentWrap>
      </Flex>
    </ModalPortal>
  );
};

const ContentWrap = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0 16px;
  margin: 0;
`;

export default Modal;
