import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Checkbox = (props) => {
  const { children, id, fontSize, margin, zoom } = props;

  const styles = {
    fontSize,
    margin,
    zoom, // 한울 추가
  };

  return (
    <React.Fragment>
      {/* 여기 스타일을 둘다 똑같이주면 나중에 문제생길수있을거같아요 일단 임시로 했어요 -한울- */}
      <CheckboxStyle {...styles} type="checkbox" id={id} />
      <CheckboxLabel {...styles} type="label" htmlFor={id}>
        {children}
      </CheckboxLabel>
    </React.Fragment>
  );
};

Checkbox.defaultProps = {};

const CheckboxStyle = styled.input`
  zoom: ${({ zoom }) => zoom};
`;

const CheckboxLabel = styled.label`
  margin-left: 4px;
  font-size: ${({ fontSize }) => fontSize};
`;

export default Checkbox;
