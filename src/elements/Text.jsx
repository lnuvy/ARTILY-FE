import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Text = (props) => {
  const { bold, color, size, children, margin, h1, h2, h3, body2, body3 } =
    props;

  const styles = { bold, color, margin, h1, h2, h3, body2, body3 };

  if (h1) {
    return <Headline {...styles}>{children}</Headline>;
  } else if (h2) {
    return <Subtitle1 {...styles}>{children}</Subtitle1>;
  } else if (h3) {
    return <Subtitle2 {...styles}>{children}</Subtitle2>;
  } else if (body2) {
    return <Body2 {...styles}>{children}</Body2>;
  } else if (body3) {
    return <Body3 {...styles}>{children}</Body3>;
  }
  return <Body1 {...styles}>{children}</Body1>;
};

Text.defaultProps = {
  bold: false,
  color: "#000",
  margin: "0",
};

const Headline = styled.h1`
  color: ${({ color }) => color};
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
`;

const Subtitle1 = styled.h2`
  color: ${({ color }) => color};
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
`;

const Subtitle2 = styled.h3`
  color: ${({ color }) => color};
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
`;

const Body1 = styled.p`
  color: ${({ color }) => color};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
`;

const Body2 = styled.p`
  color: ${({ color }) => color};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
`;

const Body3 = styled.p`
  color: #555;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.41px;
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${({ margin }) => margin};
`;

export default Text;
