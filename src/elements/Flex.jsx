import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Flex = (props) => {
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
    borderTop,
    borderBottom,
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
    borderTop,
    borderBottom,
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
  // width: null, // May8 none -> fit-conent 변경
  // height: null,
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

  border-top: ${({ borderTop }) => borderTop};
  border-bottom: ${({ borderBottom }) => borderBottom};
`;

const FlexChild = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  flex-grow: ${({ fg }) => fg};
`;

export default Flex;
