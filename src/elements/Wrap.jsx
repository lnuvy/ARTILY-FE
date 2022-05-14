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
    //5.8 높이 추가
    height,
    fg,
    border,
    borderBottom,
  };

  return <WrapStyle {...styles}>{children}</WrapStyle>;
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
  flex-grow: ${({ fg }) => fg}; // 5.12 추가 민경
  border: ${({ border }) => border}; // 5.14 추가 민경
  border-bottom: ${({ borderBottom }) => borderBottom}; // 5.14 추가 민경
`;

export default Wrap;
