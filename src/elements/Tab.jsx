import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

const Tab = (props) => {
  const { children, cg, rg, width, gtc, textAlign, margin, active } = props;

  const styles = {
    gtc,
    textAlign,
    cg,
    rg,
    width,
    margin,
    active,
  };

  return <TabStyle {...styles}>{children}</TabStyle>;
};

Tab.defaultProps = {
  margin: "0",
};

const TabStyle = styled.div`
  padding: 16px;
  color: ${theme.color.black};
  border-bottom: 2px solid ${theme.color.black};
  width: 100%;
  text-align: center;
  font-size: 13px;
`;

export default Tab;
