import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Flex = (props) => {
  const { children, ...styles } = props;

  return <FlexStyle {...styles}>{children}</FlexStyle>;
};

Flex.defaultProps = {
  width: "inherit",
  height: "inherit",
  fd: "row",
  ai: "center",
  jc: "center", // 4/29 한울추가
  margin: "0",
  padding: "0",
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
`;

export default Flex;
