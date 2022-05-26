import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import { Button } from "../elements/index";

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
    autoComplete,
    withBtn,
    //5.23 모바일에서 input박스가 높이값이 없어서 뭉개져 보이는 현상을 막기위해 추가함
    height,
    color,
    placeholderColor,
    fontSize,
  } = props;

  const styles = {
    width,
    fg,
    margin,
    alert,
    icon,
    padding,
    br,
    height,
    color,
    placeholderColor,
    fontSize,
  };

  if (withBtn) {
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
            autoComplete={autoComplete} // autoComplete off 추가
            {...styles}
          />
          <BtnWrap>
            <Button padding="9px">{icon}</Button>
          </BtnWrap>
        </InputBox>
        {alertMessage ? <InputAlert>{alertMessage}</InputAlert> : ""}
      </InputWrap>
    );
  }

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
            autoComplete={autoComplete} // autoComplete off 추가
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
            autoComplete={autoComplete} // autoComplete off 추가
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
  height: "",
  fg: "0",
  margin: "0",
  icon: false,
  padding: "9px 0",
  readOnly: false,
  onChange: () => {},
  autoComplete: "off",
  color: theme.pallete.black,
  placeholderColor: theme.pallete.gray3,
  fontSize: "14px",
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
  color: ${({ color }) => color};
  border-radius: 0px;
  font-size: ${({ fontSize }) => fontSize};
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: none;
  }
  ::placeholder {
    color: ${({ placeholderColor }) => placeholderColor};
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.41px;
    font-size: ${({ fontSize }) => fontSize};
  }
  ${(props) =>
    props.alert
      ? `
      color: ${({ color }) => color};
      border-bottom: 1px solid ${theme.color.danger};
      :focus {
        // borde-bottom: 1px solid ${theme.color.danger};
        // box-shadow: 0px 0px 6px ${theme.color.danger};
      }
    `
      : `
      color: ${({ color }) => color};
      border-bottom: 1px solid ${theme.pallete.gray1};
      :focus {
        // border-bottom: 1px solid ${theme.color.brandColor};
        // box-shadow: 0px 0px 6px ${theme.color.brandColor};
      }
    `}
`;

const SquareInput = styled.input`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  border-radius: ${({ br }) => br};
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: none;
  }
  ::placeholder {
    color: ${({ placeholderColor }) => placeholderColor};
    line-height: 21px;
    letter-spacing: -0.41px;
    font-size: ${({ fontSize }) => fontSize};
  }
  ${(props) =>
    props.alert
      ? `
      color: ${({ color }) => color};
      border: 1px solid ${theme.color.danger};
      font-size: ${({ fontSize }) => fontSize};
      :focus {
        border: 1px solid ${theme.color.danger};
      }
    `
      : `
      color: ${({ color }) => color};
      border: 1px solid ${theme.pallete.gray3};
      :focus {
        border: 1px solid ${theme.color.brandColor};
      }
      ::placeholder {
        color: ${({ placeholderColor }) => placeholderColor};
        font-size: ${({ fontSize }) => fontSize};
      }
    `}
`;

const InputIcon = styled.div`
  height: fit-content;
  width: fit-content;
  /* background-image: url(); */
  /* background-color: grey; */
  position: absolute;
  top: 5px;
  right: 0px;
`;

const BtnWrap = styled.div`
  height: fit-content;
  width: fit-content;
  position: absolute;
  top: 0;
  right: 0;
`;

const InputLabel = styled.label`
  color: ${({ color }) => color};
  display: inline-block;
  margin-bottom: 4px;
  font-size: 12px;
`;

const InputAlert = styled.p`
  color: ${theme.color.danger};
  margin-top: 4px;
  font-size: 12px;
`;
