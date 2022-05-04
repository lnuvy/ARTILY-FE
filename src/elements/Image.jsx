import styled from "styled-components";
import React from "react";
import theme from "../styles/theme";

// 다른 형태의 이미지가 더 없다면 shape 대신 circle 이라고 주기만 하면 프로필 이미지가 되는건 어떨까요 ? 4/29 한울
const Image = (props) => {
  const {
    circle, // 5/2 한울 변경
    src,
    size,
    display,
    margin,
    paddingTop,
    previewSize,
    border,
    onClick,
    bs,
    bc,
    width,
    height,
    br, //5.3 영경 변경
  } = props;

  const styles = {
    src,
    size,
    display,
    margin,
    paddingTop,
    previewSize,
    border,
    width,
    height,
    bs,
    bc,
    br,
  };

  if (circle) {
    return <ImageCircle onClick={onClick} {...styles}></ImageCircle>;
  }
  return <ImageSqure onClick={onClick} {...styles}></ImageSqure>;
};

Image.defaultProps = {
  circle: false,
  src: "",
  width: "100%",
  height: "100px",
  size: 36,
  display: "", // new
  margin: "0", // new
  paddingTop: "100%", // new
  previewSize: false,
  onClick: () => {},
  bs: "contain",
  bc: "rgba(0,0,0,0.2)",
  //border-radius 추가했습니다. -영경
  br: "",
};

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${({ bc }) => bc};

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${({ margin }) => margin};
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ImageSqure = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ bc }) => bc};
  border-radius: 2px;

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${({ margin }) => margin};
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: ${({ br }) => br};
`;

export default Image;
