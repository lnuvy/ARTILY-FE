import React from "react";
import styled from "styled-components";

const Icon = (props) => {
  const { children, onClick, fg, src, bc, width, height, margin } = props;
  const styles = {
    width,
    height,
    src,
    fg,
    bc,
    margin,
  };
  return (
    <IconStyle onClick={onClick} {...styles}>
      {children}
    </IconStyle>
  );
};

Icon.defaultProps = {
  width: "24px",
  height: "24px",
  fg: "0",
  bc: "transparent",
};

const IconStyle = styled.div`
  background-color: ${({ bc }) => bc};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
  cursor: pointer;
`;

export default Icon;
