import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

// 5/7 전체 border 있는 인풋이 꼭 필요해서 square 로 Input 나눔, border-radius br 로 추가,
// label 이 인풋을 너무 잡아먹어서 있을때만 자리차지할수있게 삼항연산자 줌 -한울-

// TODO INFO 인풋 타입넣고, onclick도 줌(storeWrite 에서 쓸거)
const Input = (props) => {
  const {
    square, // 네모박스 인풋 추가
    onKeyPress, // onKeyPress 추가
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
    readOnly,
    br, // border-radius
    onClick,
    type,
  } = props;

  const styles = { width, fg, margin, alert, icon, padding, br };

  if (square) {
    return (
      <InputWrap {...styles}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

        <InputBox {...styles}>
          <SquareInput
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
            onKeyPress={onKeyPress}
            {...styles}
          />
          {icon ? <InputIcon>{icon}</InputIcon> : ""}
        </InputBox>
        {alertMessage ? <InputAlert>{alertMessage}</InputAlert> : ""}
      </InputWrap>
    );
  } else
    return (
      <InputWrap {...styles}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <InputBox {...styles}>
          <InputContainer
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
            onKeyPress={onKeyPress}
            onClick={onClick}
            {...styles}
          ></InputContainer>
          {icon ? <InputIcon {...styles}>{icon}</InputIcon> : ""}
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
  readOnly: false,
  onChange: () => {},
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
  border-radius: 0px;
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
      border-bottom: 1px solid ${theme.color.danger};
      :focus {
        // borde-bottom: 1px solid ${theme.color.danger};
        // box-shadow: 0px 0px 6px ${theme.color.danger};
      }
    `
      : `
      color: ${theme.color.black};
      border-bottom: 1px solid ${theme.color.black};
      :focus {
        // border-bottom: 1px solid ${theme.color.brandColor};
        // box-shadow: 0px 0px 6px ${theme.color.brandColor};
      }
    `}
`;

const SquareInput = styled.input`
  height: fit-content;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ br }) => br};
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
  height: fit-content;
  width: fit-content;
  /* background-image: url(); */
  /* background-color: grey; */
  position: absolute;
  top: 11px;
  right: 11px;
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
