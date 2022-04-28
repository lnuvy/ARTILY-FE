import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    margin,
    padding,
    width,
    height,
    color,
    border,
    borderRadius,
    bg,
    fontSize,
    fontWeight,
    disabled,
    onClick,
    children,
  } = props;

  const styles = {
    margin,
    padding,
    width,
    height,
    color,
    border,
    borderRadius,
    bg,
    fontSize,
    fontWeight,
  };

  return (
    <ButtonStyle onClick={() => onClick()} disabled={disabled} {...styles}>
      {children}
    </ButtonStyle>
  );
};

Button.defaultProps = {
  margin: "",
  width: "",
  height: "",
  padding: "",
  color: "#fff",
  bg: "#0095f6",
  fontSize: "14px",
  fontWeight: "600",
  border: "none",
  borderRadius: "4px",
  disabled: false,
  onClick: () => {},
};

const ButtonStyle = styled.button`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  color: ${(props) => props.color};
  background-color: ${(props) => props.bg};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  transition: 0.2s;
  cursor: pointer;
  &:active {
    opacity: 0.7;
  }
  &:disabled {
    opacity: 0.3;
  }
`;

export default Button;
