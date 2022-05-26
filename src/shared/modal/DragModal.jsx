import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Flex, Grid, Icon, Text, Wrap } from "../../elements";
import DragProtals from "./DragPortals";
import theme from "../../styles/theme";

const DragModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modal);

  // console.log(modal);

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
  height: 100%;
  padding: 0 16px;
  margin: 0;
`;

const DragBar = styled.div`
  width: 64px;
  height: 4px;
  background-color: ${({ theme }) => `${theme.pallete.gray1}`};
  margin: 0 auto;
  border-radius: 4px;
`;

export default DragModal;
