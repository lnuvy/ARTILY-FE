import React from "react";
import styled from "styled-components";
const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    children,
    center,
    _onClick,
    fixed,
  } = props;
  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    fixed: fixed,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};
Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  fixed: false,
  _onClick: () => {},
};
//스타일 적용하기
//웬만하면 props로 가져올 수 있쥐
//box-sizing:border-box : 넓이에 여백포함
const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding : ${props.padding}` : "")};
  ${(props) => (props.margin ? `margin : ${props.margin}` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg}` : "")};
  ${(props) =>
    props.is_flex
      ? `display:flex; align-items:center; justify-content : space-between;`
      : ""};
  ${(props) => (props.center ? `text-align:center` : "")};
  ${(props) =>
    props.fixed ? `height:100px;position:fixed;top:0;z-index:1` : ""};
`;
//is_flex => 한 영역내에서 같은 간격을 두고 배치됨
export default Grid;
