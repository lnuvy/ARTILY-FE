import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { children, ...styles } = props;

  return <GridStyle {...styles}>{children}</GridStyle>;
};

const GridStyle = styled.div`
  display: grid;
  gap: ${({ gap }) => gap};
  grid-template-columns: ${({ gtc }) => gtc};
  grid-template-rows: ${({ gtr }) => gtr};
  background-color: ${({ bg }) => bg};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export default Grid;
