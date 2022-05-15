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
    height,
    _key,
    ...data
  } = props;

  const styles = {
    gtc,
    textAlign,
    cg,
    width,
    height,
    padding,
    border,
    onClick,
  };

  return (
    <CardStyle onClick={onClick} {...styles} {...data} key={_key}>
      {children}
    </CardStyle>
  );
};

Card.defaultProps = {
  padding: "0",
  border: "none",
  width: "100%",
  height: "fit-content",
  onClick: () => {},
};

const CardStyle = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 16px;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default Card;
