import React from "react";
import styled from "styled-components";

const Flex = (props) => {
  // fd: flex-direction, jc: justify-content, ai: align-items, bg: background-color
  const {
    color,
    width,
    height,
    margin,
    padding,
    border,
    borderRadius,
    borderTop,
    borderBottom,
    gap,
    position,
    top,
    left,
    right,
    fd,
    jc,
    ai,
    bg,
    zIndex,
    overflow,
    children,
    onClick,
    maxWidth,
    minWidth,
    flex,
    whiteSpace,
    float,
    alignContent,
    minHeight,
    maxHeight,
    aspectRatio,
    flexBasis,
    flexWrap, // new
    textAlign, // new
    textOverflow, // new4
    flexShrink, // new
    overscrollBehavior,
    overflowX,
    overflowY,
    borderLeft,
    cursor,
  } = props;

  const styles = {
    color,
    width,
    height,
    margin,
    padding,
    border,
    borderRadius,
    borderTop,
    borderBottom,
    gap,
    position,
    top,
    left,
    right,
    fd,
    jc,
    ai,
    bg,
    zIndex,
    overflow,
    maxWidth,
    minWidth,
    flex,
    whiteSpace,
    float,
    alignContent,
    minHeight,
    maxHeight,
    aspectRatio,
    flexBasis,
    flexWrap, // new
    textAlign, // new
    textOverflow, // new
    flexShrink, // new
    overscrollBehavior,
    overflowX,
    overflowY,
    borderLeft,
    cursor,
  };

  return (
    <FlexStyle onClick={onClick} {...styles}>
      {children}
    </FlexStyle>
  );
};

Flex.defaultProps = {
  width: "100%",
  height: "",
  margin: "",
  padding: "",
  border: "none",
  borderRadius: "",
  borderTop: "",
  borderBottom: "",
  gap: "",
  position: "static",
  top: "",
  left: "",
  right: "",
  fd: "row",
  jc: "center",
  ai: "center",
  bg: "",
  zIndex: "",
  overflow: "visible",
  onClick: () => {},
  maxWidth: "",
  minWidth: "",
  flex: "",
  whiteSpace: "",
  float: "",
  alignContent: "",
  minHeight: "",
  maxHeight: "",
  aspectRatio: "",
  flexBasis: "",
  flexWrap: "", // new
  textAlign: "", // new
  textOverflow: "", // new
  flexShrink: "", // new
  overscrollBehavior: "auto",
  overflowX: "",
  overflowY: "",
  borderLeft: "",
  cursor: "",
};

const FlexStyle = styled.div`
  display: flex;
  flex-direction: ${(props) => props.fd};
  justify-content: ${(props) => props.jc};
  align-items: ${(props) => props.ai};

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};

  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  gap: ${(props) => props.gap};
  z-index: ${(props) => props.zIndex};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};

  background-color: ${(props) => props.bg};
  overflow: ${(props) => props.overflow};
  color: ${(props) => props.color};
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  flex: ${(props) => props.flex};
  white-space: ${(props) => props.whiteSpace};
  float: ${(props) => props.float};
  align-content: ${(props) => props.alignContent};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  aspect-ratio: ${(props) => props.aspectRatio};
  flex-basis: ${(props) => props.flexBasis};
  flex-wrap: ${(props) => props.flexWrap};
  text-align: ${(props) => props.textAlign};
  text-overflow: ${(props) => props.textOverflow};
  flex-shrink: ${(props) => props.flexShrink};
  overscroll-behavior: ${(props) => props.overscrollBehavior};
  overflow-x: ${(props) => props.overflowX};
  overflow-y: ${(props) => props.overflowY};
  border-left: ${(props) => props.borderLeft};
  cursor: ${(props) => props.cursor};
`;

export default Flex;
