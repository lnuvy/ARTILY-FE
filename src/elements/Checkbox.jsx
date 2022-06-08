import React from "react";
import styled from "styled-components";
import { Icon } from "../elements/index";
import { CheckBoxUnchecked, CheckBoxChecked } from "../assets/icons";

const Checkbox = (props) => {
  const { children, id, fontSize, margin, fg, onChange, zoom, checked } = props;
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
        <Icon>{checked ? <CheckBoxChecked /> : <CheckBoxUnchecked />}</Icon>
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
  cursor: pointer;
`;

const CheckboxStyle = styled.input`
  zoom: ${({ zoom }) => zoom};
  border-radius: 0;
  appearance: none;
  display: none;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
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
