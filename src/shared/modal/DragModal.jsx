import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Flex, Grid, Icon, Text, Wrap } from "../../elements";
import DragProtals from "./DragPortals";

// X 아이콘
import { IoCloseOutline } from "react-icons/io5";
import { closeModal } from "../../redux/modules/modal";

const DragModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modal);

  console.log(modal);

  // 모달 띄웠을때 배경 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <DragProtals>
      <Wrap margin="12px 0 0 0">
        <DragBar />
        <Wrap margin="32px 0 0 0">
          <ContentWrap>{modal.content}</ContentWrap>
        </Wrap>
      </Wrap>
    </DragProtals>
  );
};

const ContentWrap = styled.div`
  width: 100%;
  /* padding: 12px; */
  margin: 12px 0 0 0;
  padding: 0;
`;

const DragBar = styled.div`
  width: 64px;
  height: 4px;
  background-color: #e0e0e0;
  margin: 0 auto;
`;

export default DragModal;