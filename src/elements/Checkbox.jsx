import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Checkbox = (props) => {
  const { children, id, fontSize, margin } = props;

  const styles = {
    children,
    id,
    fontSize,
    margin,
  };

  return (
    <React.Fragment>
      <CheckboxStyle type="checkbox" id={id} />
      <CheckboxLabel type="label" htmlFor={id}>
        {children}
      </CheckboxLabel>
    </React.Fragment>
  );
};

Checkbox.defaultProps = {};

const CheckboxStyle = styled.input``;

const CheckboxLabel = styled.label`
  margin-left: 4px;
  fontsize: ${({ fontSize }) => fontSize};
`;

export default Checkbox;
