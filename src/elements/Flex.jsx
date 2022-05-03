import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Flex = (props) => {
  // 5/3 한울 패딩추가
  const { onClick, children, fg, child, jc, ai, padding, margin, fd, bc } =
    props;

  const styles = {
    fg,
    jc,
    ai,
    padding,
    margin,
    fd,
    bc,
  };

  if (child) {
    return (
      <FlexChild onClick={onClick} {...styles}>
        {children}
      </FlexChild>
    );
  }

  return (
    <FlexStyle onClick={onClick} {...styles}>
      {children}
    </FlexStyle>
  );
};

Flex.defaultProps = {
  width: "inherit",
  height: "inherit",
  fd: "row",
  ai: "center",
  margin: "0",
  padding: "0",
  jc: "left",
  bc: "transparent",
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
  background-color: ${({ bc }) => bc};
`;

const FlexChild = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  flex-grow: ${({ fg }) => fg};
`;

export default Flex;
