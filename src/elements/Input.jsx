import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Input = (props) => {
  const {
    onChange,
    value,
    placeholder,
    id,
    label,
    alert,
    alertMessage,
    width,
    fg,
    margin,
    icon,
    padding,
  } = props;

  const styles = { width, fg, margin, alert, icon, padding };

  return (
    <InputWrap {...styles}>
      <InputLabel id={id}>{label}</InputLabel>
      <InputBox {...styles}>
        <InputContainer
          id={id}
          value={value ? value : ""}
          placeholder={placeholder}
          onChange={onChange}
          {...styles}
        ></InputContainer>
        {icon ? <InputIcon {...styles} /> : ""}
      </InputBox>
      {alertMessage ? <InputAlert>{alertMessage}</InputAlert> : ""}
    </InputWrap>
  );
};

export default Input;

Input.defaultProps = {
  width: "100%",
  fg: "0",
  margin: "0",
  icon: false,
  padding: "12px",
};

const InputWrap = styled.div`
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
`;

const InputBox = styled.div`
  position: relative;
`;

const InputContainer = styled.input`
  height: fit-content;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  :focus-visible {
    outline: none;
  }
  ::placeholder {
    color: ${theme.color.black};
    opacity: 0.3;
  }
  ${(props) =>
    props.alert
      ? `
      color: ${theme.color.black};
      border: 1px solid ${theme.color.danger};
      :focus {
        border: 1px solid ${theme.color.danger};
        box-shadow: 0px 0px 6px ${theme.color.danger};
      }
    `
      : `
      color: ${theme.color.black};
      border: 1px solid ${theme.color.black};
      :focus {
        border: 1px solid ${theme.color.brandColor};
        box-shadow: 0px 0px 6px ${theme.color.brandColor};
      }
    `}
`;

const InputIcon = styled.div`
  height: 28px;
  width: 28px;
  background-image: url();
  background-color: grey;
  position: absolute;
  top: calc(${({ padding }) => padding} / 2);
  right: calc(${({ padding }) => padding} / 2);
`;

const InputLabel = styled.label`
  color: ${theme.color.black};
  display: inline-block;
  margin-bottom: 4px;
  font-size: 12px;
`;

const InputAlert = styled.p`
  color: ${theme.color.danger};
  margin-top: 4px;
  font-size: 12px;
`;
