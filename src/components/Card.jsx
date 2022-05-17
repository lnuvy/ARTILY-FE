import React from "react";
import styled from "styled-components";

const Card = (props) => {
  const {
    children,
    onClick,
    _key,
    //
    height,
    width,
    padding,
    border,
    br,
    //
    ...data
  } = props;

  const styles = {
    height,
    width,
    padding,
    border,
    br,
  };

  return (
    <CardStyle onClick={onClick} {...styles} {...data} key={_key}>
      {children}
    </CardStyle>
  );
};

Card.defaultProps = {
  onClick: () => {},
  width: "100%",
  height: "fit-content",

  padding: "0",

  border: "none",
  br: "16px",
};

const CardStyle = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  padding: ${({ padding }) => padding};

  border: ${({ border }) => border};
  border-radius: ${({ br }) => br};

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default Card;
