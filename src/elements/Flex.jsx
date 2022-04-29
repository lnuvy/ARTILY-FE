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
  margin: "0",
  padding: "0",
};

const FlexStyle = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  display: flex;
  flex-direction: ${({ fd }) => fd};
  align-items: ${({ ai }) => ai};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;

export default Flex;
