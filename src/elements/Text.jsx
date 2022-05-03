import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Text = (props) => {
  const {
    bold,
    color,
    size,
    children,
    margin,
    h1,
    h2,
    h3,
    body2,
    body3,
    fg,
    textAlign,
    lineHeight,
    contents,
  } = props;

  const styles = {
    bold,
    color,
    margin,
    h1,
    h2,
    h3,
    body2,
    body3,
    fg,
    textAlign,
    lineHeight,
    contents,
  };

  if (h1) {
    return (
      <Headline {...styles}>
        {children}
        {contents}
      </Headline>
    );
  } else if (h2) {
    return (
      <Subtitle1 {...styles}>
        {children}
        {contents}
      </Subtitle1>
    );
  } else if (h3) {
    return (
      <Subtitle2 {...styles}>
        {children}
        {contents}
      </Subtitle2>
    );
  } else if (body2) {
    return (
      <Body2 {...styles}>
        {children}
        {contents}
      </Body2>
    );
  } else if (body3) {
    return (
      <Body3 {...styles}>
        {children}
        {contents}
      </Body3>
    );
  }
  return (
    <Body1 {...styles}>
      {children}
      {contents}
    </Body1>
  );
};

Text.defaultProps = {
  bold: false,
  color: "#000",
  margin: "0",
  fg: "0",
  textAlign: "inherit",
};

const Headline = styled.h1`
  color: ${({ color }) => color};
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
  text-align: ${({ textAlign }) => textAlign};
  ${(props) => (props.lineHeight ? props.lineHeight : null)};
`;

const Subtitle1 = styled.h2`
  color: ${({ color }) => color};
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
  text-align: ${({ textAlign }) => textAlign};
  ${(props) => (props.lineHeight ? props.lineHeight : null)};
`;

const Subtitle2 = styled.h3`
  color: ${({ color }) => color};
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
  text-align: ${({ textAlign }) => textAlign};
  ${(props) => (props.lineHeight ? props.lineHeight : null)};
`;

const Body1 = styled.p`
  color: ${({ color }) => color};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
  text-align: ${({ textAlign }) => textAlign};
  ${(props) => (props.lineHeight ? props.lineHeight : null)};
`;

const Body2 = styled.p`
  color: ${({ color }) => color};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
  text-align: ${({ textAlign }) => textAlign};
  ${(props) => (props.lineHeight ? props.lineHeight : null)};
`;

const Body3 = styled.p`
  color: #555;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
  flex-grow: ${({ fg }) => fg};
  text-align: ${({ textAlign }) => textAlign};
  ${(props) => (props.lineHeight ? props.lineHeight : null)};
`;

export default Text;
