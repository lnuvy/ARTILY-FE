import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Icon = (props) => {
  const { children, fg, child, src, bc, width, height, margin } = props;

  const styles = {
    width,
    height,
    src,
    fg,
    bc,
    margin,
  };

  return <IconStyle {...styles}>{children}</IconStyle>;
};

Icon.defaultProps = {
  width: "24px",
  height: "24px",
  fg: "0",
  bc: "black",
};

const IconStyle = styled.div`
  background-color: ${({ bc }) => bc};
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  margin: ${({ margin }) => margin};

  flex-grow: ${({ fg }) => fg};
`;

export default Icon;
