import React from "react";
import styled from "styled-components";

const Text = (props) => {
  // new : margin, textAlign
  const {
    fontSize,
    fontWeight,
    color,
    margin,
    width,
    textAlign,
    children,
    lineHeight,
    overflow,
    onKeyPress,
    onClick,
  } = props;
  const styled = {
    fontSize,
    fontWeight,
    color,
    margin,
    textAlign,
    lineHeight,
    width,
    overflow,
  };
  return (
    <TextStyled {...styled} onClick={onClick} onKeyPress={onKeyPress}>
      {children}
    </TextStyled>
  );
};

Text.defaultProps = {
  fontSize: "14px",
  fontWeight: "",
  color: "black",
  textAlign: "start",
  lineHeight: "normal",
  width: "",
  onClick: () => {},
  onKeyPress: () => {},
};

const TextStyled = styled.div`
  /* width: 100%; */
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  text-align: ${(props) => props.textAlign};
  line-height: ${(props) => props.lineHeight};
  width: ${(props) => props.width};
`;

export default Text;
