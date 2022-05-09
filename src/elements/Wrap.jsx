import React from "react";
import styled from "styled-components";

const Wrap = (props) => {
  const {
    children,
    width,
    textAlign,
    margin,
    padding,
    bc,
    position,
    br,
    height,
  } = props;

  const styles = {
    textAlign,
    width,
    margin,
    padding,
    bc,
    position,
    br,
    //5.8 높이 추가
    height,
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
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bc }) => bc};
  position: ${({ position }) => position};
  border-radius: ${({ br }) => br};
  height: ${({ height }) => height};
`;

export default Wrap;
