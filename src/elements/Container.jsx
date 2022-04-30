import React from "react";
import styled from "styled-components";

const Container = (props) => {
  const { children, ...styles } = props;

  return <ContainerStyle {...styles}>{children}</ContainerStyle>;
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 768px;
  height: ${({ height }) => height};
  min-height: ${({ height }) => height || "100vh"};
  margin: 0 auto;
  padding: ${({ padding }) => padding};
  ${({ addstyle }) => addstyle};

  ${({ isFlex }) =>
    isFlex
      ? `flex-direction: column; align-items: center; justify-content: center;`
      : ""};

  @media (max-width: 800px) {
    max-width: none;
    width: 100%;
  }
`;
export default Container;
