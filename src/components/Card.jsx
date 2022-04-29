import React from "react";
import styled from "styled-components";

const Card = (props) => {
  const {
    children,
    gtc,
    textAlign,
    cg,
    width,
    padding,
    border,
    onClick,
    ...data
  } = props;

  const styles = {
    gtc,
    textAlign,
    cg,
    width,
    padding,
    border,
    onClick,
  };

  return (
    <CardStyle {...styles} {...data}>
      {children}
    </CardStyle>
  );
};

Card.defaultProps = {
  padding: "0",
  border: "none",
  onClick: () => {},
};

const CardStyle = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 16px;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default Card;
