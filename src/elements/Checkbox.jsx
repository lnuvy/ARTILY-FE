import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Checkbox = (props) => {
  // zoom, onChange 추가 zoom은 체크박스가 너무 작아서 넣었습니다 -한울-
  const { children, id, fontSize, margin, fg, onChange, zoom } = props;

  const styles = {
    margin,
    fg,
  };

  return (
    <React.Fragment>
      <CheckboxWrap {...styles}>
        <CheckboxStyle
          onChange={onChange}
          type="checkbox"
          id={id}
          zoom={zoom}
        />
        <CheckboxLabel type="label" htmlFor={id} fontSize={fontSize}>
          {children}
        </CheckboxLabel>
      </CheckboxWrap>
    </React.Fragment>
  );
};

Checkbox.defaultProps = {};

const CheckboxWrap = styled.div`
  flex-grow: ${({ fg }) => fg};

  display: flex;
  align-items: center;
  margin: ${({ margin }) => margin};
`;

const CheckboxStyle = styled.input`
  zoom: ${({ zoom }) => zoom};
  border-radius: 0;
  :hover {
    cursor: pointer;
  }
`;

const CheckboxLabel = styled.label`
  margin-left: 4px;
  font-size: ${({ fontSize }) => fontSize};
  :hover {
    cursor: pointer;
  }
`;

export default Checkbox;
