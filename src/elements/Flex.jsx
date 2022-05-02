import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Flex = (props) => {
  // 4/30 fd 빠져있어서 추가했습니다 -한울-
  const { children, fg, child, jc, ai, margin, fd } = props;

  const styles = {
    fg,
    child,
    jc,
    ai,
    margin,
    fd,
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
  justify-content: ${({ jc }) => jc}; // 4/29 한울추가
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
