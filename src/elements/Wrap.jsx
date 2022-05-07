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
  };

  return <WrapStyle {...styles}>{children}</WrapStyle>;
};

Wrap.defaultProps = {
  textAlign: "left",
  width: "inherit",
  height: "inherit",
  margin: "0",
  padding: "0",
  bc: "transparent",
  position: "inherit",
  br: "0",
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
`;

export default Wrap;
