import React from "react";
import styled from "styled-components";

const Flex = (props) => {
  //
  const { children, onClick, wrap, ...styles } = props;

  if (wrap) {
    return (
      <FlexWrap onClick={onClick} {...styles}>
        {children}
      </FlexWrap>
    );
  } else {
    return (
      <FlexStyle onClick={onClick} {...styles}>
        {children}
      </FlexStyle>
    );
  }
};

Flex.defaultProps = {
  width: "inherit",
  height: "inherit",
  wrap: false,
  fd: "row",
  ai: "center",
  jc: "center",
};

const FlexWrap = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  display: flex;
  flex-direction: ${({ fd }) => fd};
  align-items: ${({ ai }) => ai};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;

const FlexStyle = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  display: flex;
  flex-direction: ${({ fd }) => fd};
  align-items: ${({ ai }) => ai};
  justify-content: ${({ jc }) => jc};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  background-color: ${({ bg }) => bg};
`;

export default Flex;
