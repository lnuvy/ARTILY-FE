import React from "react";
import styled from "styled-components";

const Wrap = (props) => {
  const {
    children,
    width,
    height,
    textAlign,
    margin,
    padding,
    bc,
    position,
    br,
    fg,
    border,
    borderBottom,
    onClick,
    bottom,
    right,
    left,
    top,
  } = props;

  const styles = {
    textAlign,
    width,
    height,
    margin,
    padding,
    bc,
    position,
    br,
    height,
    fg,
    border,
    borderBottom,
    bottom,
    right,
    left,
    top,
  };

  return (
    <WrapStyle onClick={onClick} {...styles}>
      {children}
    </WrapStyle>
  );
};

Wrap.defaultProps = {
  textAlign: "left",
  margin: "0",
  padding: "0",
  bc: "transparent",
  br: "0",
  height: "",
};

const WrapStyle = styled.div`
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bc }) => bc};
  position: ${({ position }) => position};
  border-radius: ${({ br }) => br};
  flex-grow: ${({ fg }) => fg};
  border: ${({ border }) => border};
  border-bottom: ${({ borderBottom }) => borderBottom};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
`;

export default Wrap;
