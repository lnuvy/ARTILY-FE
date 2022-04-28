import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { children, cg, width, gtc, textAlign, padding } = props;

  const styles = {
    gtc,
    textAlign,
    cg,
    width,
    padding,
  };

  return <CardStyle {...styles}>{children}</CardStyle>;
};

Grid.defaultProps = {
  padding: "24px",
};

const CardStyle = styled.div`
  background-color: grey;
  width: 100%;
  height: fit-content;
  padding: ${({ padding }) => padding};
`;

export default Grid;
