import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Textarea = (props) => {
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
    padding,
    maxLength,
    minLength,
    textLine,
    br,
    border,
  } = props;

  const styles = { width, fg, margin, alert, padding, textLine, br, border };

  const Textarea = React.useRef();
  const [MaxNum, SetMaxNum] = React.useState(null);
  const ChangeMaxNum = () => {
    SetMaxNum(Textarea.current.value.length);
  };

  React.useEffect(() => {
    SetMaxNum(Textarea.current.value.length);
    Textarea.current.addEventListener("change", ChangeMaxNum);
  }, [Textarea]);

  return (
    <TextareaWrap {...styles}>
      {label && <TextareaLabel htmlFor={id}>{label}</TextareaLabel>}
      <TextareaBox {...styles}>
        <TextareaContainer
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
            ChangeMaxNum(e);
          }}
          maxLength={maxLength}
          minLength={minLength}
          {...styles}
          ref={Textarea}
        ></TextareaContainer>
        {maxLength && (
          <TextareaMaxCharacter {...styles}>
            {MaxNum ? MaxNum : "0"}/{maxLength}byte
          </TextareaMaxCharacter>
        )}
      </TextareaBox>
      {alertMessage ? <TextareaAlert>{alertMessage}</TextareaAlert> : ""}
    </TextareaWrap>
  );
};

export default Textarea;

Textarea.defaultProps = {
  width: "100%",
  fg: "0",
  margin: "0",
  padding: "0",
  onChange: () => {},
  br: "",
};

const TextareaWrap = styled.div`
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
`;

const TextareaBox = styled.div`
  position: relative;
`;

const TextareaContainer = styled.textarea`
  height: calc(${({ textLine }) => textLine}rem);
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding}; // 0지움
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  border: ${({ border }) => border}!important;
  resize: none;
  font-size: 14px;
  letter-spacing: -0.41 px;
  line-height: 22px;
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: none;
  }
  ::placeholder {
    color: ${theme.pallete.gray3};
  }
  ${(props) =>
    props.alert
      ? `
      color: ${theme.color.black};
      border: 1px solid ${theme.color.danger};
      :focus {
        border: 1px solid ${theme.color.danger};
        // box-shadow: 0px 0px 6px ${theme.color.danger};
      }
    `
      : `
      color: ${theme.color.black};
      border: 1px solid ${theme.color.black};
      :focus {
        border: 1px solid ${theme.color.brandColor};
        // box-shadow: 0px 0px 6px ${theme.color.brandColor};
      }
    `}
  border-radius: ${({ br }) => br};
`;

const TextareaLabel = styled.label`
  color: ${theme.color.black};
  display: inline-block;
  margin-bottom: 4px;
  font-size: 12px;
`;

const TextareaMaxCharacter = styled.p`
  position: absolute;
  color: ${theme.color.black};
  width: fit-content;
  height: fit-content;
  margin-bottom: 4px;
  font-size: 12px;
  bottom: ${({ padding }) => padding};
  right: ${({ padding }) => padding};
`;

const TextareaAlert = styled.p`
  color: ${theme.color.danger};
  font-size: 12px;
`;
