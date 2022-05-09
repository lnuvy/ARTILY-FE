import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    onClick,
    cg,
    rg,
    width,
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
  gtc: "auto", // 2줄 하고 싶으면 "auto auto", 3줄 하고 싶으면 "auto auto auto"
  cg: "16px",
  rg: "16px",
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
  margin: ${({ margin }) => margin};

  border: ${({ border }) => border};
`;

export default Grid;
