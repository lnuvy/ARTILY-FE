import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Button = (props) => {
  const {
    children,
    onClick,
    display,
    jc,
    width,
    height,
    margin,
    padding,
    br,
    fg,
    bc,
    outline,
    position,
    top,
    left,
    right,
    bottom,
    text,
  } = props;

  const styles = {
    display,
    jc,
    width,
    height,
    margin,
    padding,
    br,
    fg,
    outline,
    bc,
    position,
    top,
    left,
    right,
    bottom,
    text,
  };

  return (
    <React.Fragment>
      <ButtonStyle onClick={onClick} {...styles}>
        {children}
      </ButtonStyle>
    </React.Fragment>
  );
};

Button.defaultProps = {
  onClick: () => {},
  display: "inherit",
  jc: "0",
  width: "fit-content",
  height: "fit-content",
  margin: "0",
  padding: "16px",
  border: "none",
  br: "8px",
  fg: "0",
  bc: `${theme.color.brandColor}`,
  position: "inherit",
  top: null,
  bottom: null,
  left: null,
  right: null,
};

const ButtonStyle = styled.button`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  display: ${({ display }) => display};
  flex-grow: ${({ fg }) => fg};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ br }) => br};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  justify-content: center;

  ${(props) =>
    props.text
      ? `
    background-color: transparent;
    color: ${theme.color.black};
    :focus {
      background-color: ${theme.color.lightGray};
      opacity: 0.8;
    }
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
    `
      : props.outline
      ? `
    background-color: transparent;
    color: ${theme.color.black};
    border: 1px solid ${theme.color.black};
    :focus {
      background-color: ${theme.color.lightGray};
      opacity: 0.8;
    }
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
    `
      : `
    background-color: ${props.bc};
    color: ${theme.color.white};
    border: none;
    :focus {
      opacity: 0.9;
    }
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
    `};
`;

export default Button;
