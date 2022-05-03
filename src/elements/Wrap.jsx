import React from "react";
import styled from "styled-components";

const Wrap = (props) => {
  const { children, width, textAlign, margin, padding, bc } = props;

  const styles = {
    textAlign,
    width,
    margin,
    padding,
    bc,
  };

  return <WrapStyle {...styles}>{children}</WrapStyle>;
};

Wrap.defaultProps = {
  textAlign: "left",
  width: "inherit",
  margin: "0",
  padding: "0",
  bc: "transparent",
};

const WrapStyle = styled.div`
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bc }) => bc};
`;

export default Wrap;
