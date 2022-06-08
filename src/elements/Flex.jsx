import React from "react";
import styled from "styled-components";

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
    position,
    top,
    bottom,
    right,
    left,
    minWidth,
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
    position,
    top,
    bottom,
    right,
    left,
    minWidth,
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
  fd: "row",
  ai: "center",
  margin: "0",
  padding: "0",
  jc: "left",
  bc: "transparent",
  position: "",
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

  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  min-width: ${({ minWidth }) => minWidth};
`;

const FlexChild = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  flex-grow: ${({ fg }) => fg};
`;

export default Flex;
