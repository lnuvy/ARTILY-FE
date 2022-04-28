import React, { forwardRef } from "react";
import styled from "styled-components";

const Textarea = forwardRef((props, ref) => {
  const {
    height,
    rows,
    placeholder,
    padding,
    bg,
    maxLength,
    lineHeight,
    onChange,
    overflow,
    value,
    onKeyDown,
  } = props;
  return (
    <TextareaStyle
      rows={rows}
      autoComplete="off"
      autoCorrect="off"
      placeholder={placeholder}
      lineHeight={lineHeight}
      height={height}
      bg={bg}
      ref={ref}
      maxLength={maxLength}
      padding={padding}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      overflow={overflow}
      value={value}
    />
  );
});

Textarea.defaultProps = {
  rows: "1",
  placeholder: "",
  padding: "0",
  bg: "",
  maxLength: 0,
  lineHeight: "24px",
  overflow: "",
  onChange: () => {},
  value: "",
};

const TextareaStyle = styled.textarea`
  width: 100%;
  resize: none;
  outline: none;
  border: none;
  /* font-size: 16px; */
  height: ${(props) => props.height};
  line-height: ${(props) => props.lineHeight};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.padding};
  overflow: ${(props) => props.overflow};
`;

export default Textarea;
