import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Flex, Grid, Icon, Text, Wrap } from "../../elements";
import ModalPortal from "./Portals";

// X 아이콘
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
      <Flex fd="column" margin="0" width="100%">
        <Flex padding="20px 20px 20px 28px" height="70px" jc="space-between">
          <Text h1 bold>
            {modal.title}
          </Text>
          <IoCloseOutline onClick={modalClose} size={36} />
        </Flex>
        <ContentWrap>{modal.content}</ContentWrap>
      </Flex>
    </ModalPortal>
  );
};

const ContentWrap = styled.div`
  width: 100%;
  height: calc(67vh - 70px);
  padding: 12px;
  margin: 0;
`;

// const ModalFooter = styled.div`
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   bottom: 10px;
//   width: 100%;
//   border-radius: 0 0 8px 8px;
//   border-top: 1px solid gray;
//   box-shadow: 1px 2px 24px black;
// `;

export default Modal;
