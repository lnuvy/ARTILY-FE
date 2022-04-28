import React from "react";
import styled from "styled-components";

const Grid = ({ onClick, children, className, ...styles }) => {
  return (
    <GridStyle className={className} onClick={onClick} {...styles}>
      {children}
    </GridStyle>
  );
};

Grid.defaultProps = {
  jc: "center",
  ai: "center",
};

const GridStyle = styled.div`
  justify-content: ${({ jc }) => jc};
  width: ${({ width }) => width};
  opacity: ${({ opacity }) => opacity};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  background-color: ${({ bgColor, theme }) => theme.color[bgColor]};
  border-radius: ${({ radius }) => radius};
  overflow: ${({ overflow }) => overflow};
  box-shadow: ${({ shadow }) => shadow};
  cursor: ${({ cursor }) => cursor};
  transform: translate(${({ translate }) => translate});
`;

export default Grid;
