import React from "react";
import styled from "styled-components";

const Card = (props) => {
  const { children, ...data } = props;

  return <CardStyle {...data}>{children}</CardStyle>;
};

Card.defaultProps = {
  padding: "24px",
};

const CardStyle = styled.div`
  background-color: grey;
  width: 100%;
  height: fit-content;
  padding: ${({ padding }) => padding};
`;

export default Card;
