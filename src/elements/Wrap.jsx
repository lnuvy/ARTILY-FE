import React from "react";
import styled from "styled-components";

const Wrap = (props) => {
  const { children, width, textAlign, margin, padding } = props;

  const styles = {
    textAlign,

    width,
    margin,
    padding,
  };

  return <WrapStyle {...styles}>{children}</WrapStyle>;
};

Wrap.defaultProps = {
  textAlign: "left",
  width: "inherit",
  margin: "0",
  padding: "0",
};

const WrapStyle = styled.div`
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;

export default Wrap;