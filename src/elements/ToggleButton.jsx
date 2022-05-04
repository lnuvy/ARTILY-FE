import React, { useState } from "react";
import styled from "styled-components";
import theme from "../styles/theme";

// 필터링에서 사용하는 동글동글 토글되는 버튼
const ToggleButton = (props) => {
  const { children, onClick, jc, width, margin, padding, fg, bc, select } =
    props;

  const styles = {
    select,
    jc,
    width,
    margin,
    padding,
    fg,
    bc,
  };

  return (
    <ButtonStyle onClick={onClick} {...styles}>
      {children}
    </ButtonStyle>
  );
};

ToggleButton.defaultProps = {
  onClick: () => {},
  display: "inline",
  jc: "0",
  width: "fit-content",
  height: "fit-content",
  margin: "5px",
  padding: "12px",
  border: "none",
  fg: "0",
  bc: `white`,
  select: false,
};

const ButtonStyle = styled.button`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: 8px;
  border: 1px solid gray;
  justify-content: center;
  flex-grow: ${({ fg }) => fg};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: white;
  ${({ select, theme }) =>
    select
      ? `border: 1px solid transparent; background: ${theme.color.brandColor}; color: white; `
      : null};
`;

export default ToggleButton;
