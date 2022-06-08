import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    onClick,
    cg,
    rg,
    width,
    height,
    gtc,
    textAlign,
    margin,
    bc,
    border,
  } = props;

  const styles = {
    gtc,
    textAlign,
    cg,
    rg,
    width,
    height,
    margin,
    bc,
    border,
  };

  return (
    <GridStyle onClick={onClick} {...styles}>
      {children}
    </GridStyle>
  );
};

Grid.defaultProps = {
  gtc: "auto",
  cg: "8px",
  rg: "8px",
  textAlign: "left",
  margin: "0",
  bc: "transparent",
  border: "none",
};

const GridStyle = styled.div`
  background-color: ${({ bc }) => bc};
  display: grid;
  column-gap: ${({ cg }) => cg};
  row-gap: ${({ rg }) => rg};
  grid-template-columns: ${({ gtc }) => gtc};
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};

  border: ${({ border }) => border};
`;

export default Grid;
