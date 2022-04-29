import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Checkbox = (props) => {
  const { children, id, fontSize, margin, fg } = props;

  const styles = {
    children,
    id,
    fontSize,
    margin,
    fg,
  };

  return (
    <React.Fragment>
      <CheckboxWrap {...styles}>
        <CheckboxStyle type="checkbox" id={id} />
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
`;

const CheckboxStyle = styled.input`
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
