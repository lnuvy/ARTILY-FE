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
    shadow,
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
    //5.13 그림자 추가
    shadow,
  };

  if (circle) {
    return <ImageCircle onClick={onClick} {...styles}></ImageCircle>;
  }
  return <ImageSqure onClick={onClick} {...styles}></ImageSqure>;
};

Image.defaultProps = {
  circle: false,
  src: "url('')",
  width: "100%",
  height: "100px",
  size: 36,
  display: "", // new
  margin: "0", // new
  paddingTop: "100%", // new
  previewSize: false,
  onClick: () => {},
  bs: "cover",
  bc: "rgba(0,0,0,0.2)",
  //border-radius 추가했습니다. -영경
  br: "",
  border: "none", // May8 수정
  //5.13 shadow 추가
  shadow: "none",
};

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${({ bc }) => bc};

  background-image: url(${({ src }) => src});
  background-size: cover;
  margin: ${({ margin }) => margin};
  background-position: center;
  background-repeat: no-repeat;
  border: ${({ border }) => border};
`;

const ImageSqure = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ bc }) => bc};
  border-radius: 2px;
  background-image: url(${({ src }) => src});
  background-size: ${({ bs }) => bs};
  margin: ${({ margin }) => margin};
  background-position: center;
  background-repeat: no-repeat;
  border: ${({ border }) => border};
  border-radius: ${({ br }) => br};
  box-shadow: ${({ shadow }) => shadow};
`;

export default Image;
