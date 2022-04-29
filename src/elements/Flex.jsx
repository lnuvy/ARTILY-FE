import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Flex = (props) => {
  const { children, fg, child, jc, ai, margin } = props;

  const styles = {
    fg,
    child,
    jc,
    ai,
    margin,
  };

  if (child) {
    return <FlexChild {...styles}>{children}</FlexChild>;
  }

  return <FlexStyle {...styles}>{children}</FlexStyle>;
};

Flex.defaultProps = {
  width: "inherit",
  height: "inherit",
  fd: "row",
  ai: "center",
  margin: "0",
  padding: "0",
  jc: "left",
};

const FlexStyle = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  display: flex;
  flex-direction: ${({ fd }) => fd};
  align-items: ${({ ai }) => ai};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  justify-content: ${({ jc }) => jc};
`;

const FlexChild = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  flex-grow: ${({ fg }) => fg};
`;

export default Flex;
