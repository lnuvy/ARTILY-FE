import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Flex = (props) => {
  // 5/3 한울 padding, bc, br 추가
  const {
    onClick,
    children,
    width,
    height,
    fg,
    child,
    jc,
    ai,
    padding,
    margin,
    fd,
    bc,
    br,
  } = props;

  const styles = {
    width,
    height,
    fg,
    jc,
    ai,
    padding,
    margin,
    fd,
    bc,
    br,
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
  width: "none",
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
  align-items: ${({ ai }) => ai};
  justify-content: ${({ jc }) => jc};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bc }) => bc};
  border-radius: ${({ br }) => br};
`;

const FlexChild = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  flex-grow: ${({ fg }) => fg};
`;

export default Flex;
