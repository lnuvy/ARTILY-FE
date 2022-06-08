import React from "react";
import styled from "styled-components";

const ToggleButton = (props) => {
  const {
    children,
    onClick,
    jc,
    width,
    margin,
    padding,
    fg,
    bc,
    select,
    border,
    color,
    fontSize,
  } = props;

  const styles = {
    select,
    jc,
    width,
    margin,
    padding,
    fg,
    bc,
    border,
    color,
    fontSize,
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
  margin: "0",
  padding: "8px 16px",
  border: "none",
  fg: "0",
  bc: `white`,
  select: false,
  id: false,
  fontSize: "16px",
};

const ButtonStyle = styled.button`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  border-radius: 8px;
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  justify-content: center;
  flex-grow: ${({ fg }) => fg};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
  background-color: white;
  ${({ select, theme }) =>
    select
      ? `
      border: 1px solid transparent; 
      background: ${theme.color.brandColor}; 
      color: white; `
      : null};
`;

export default ToggleButton;
