import styled from "styled-components";
import React from "react";
import theme from "../styles/theme";

const Image = (props) => {
  const {
    circle,
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
    br,
    shadow,
    backgroundPosition,
    backgroundSize,
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
    shadow,
    backgroundPosition,
    backgroundSize,
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
  display: "",
  margin: "0",
  paddingTop: "100%",
  previewSize: false,
  onClick: () => {},
  bs: "cover",
  bc: `${theme.pallete.gray1}`,
  br: "",
  border: ``,
  shadow: "none",
  backgroundPosition: "center",
  backgroundSize: "cover",
};

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${({ bc }) => bc};

  background-image: url(${({ src }) => src});
  background-size: ${({ backgroundSize }) => backgroundSize};
  margin: ${({ margin }) => margin};
  background-repeat: no-repeat;
  border: ${({ border }) => border};
  background-position: ${({ backgroundPosition }) => backgroundPosition};
`;

const ImageSqure = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ bc }) => bc};
  border-radius: 2px;
  background-image: url(${({ src }) => src});
  background-size: ${({ bs }) => bs};
  margin: ${({ margin }) => margin};
  background-repeat: no-repeat;
  border: ${({ border }) => border};
  border-radius: ${({ br }) => br};
  box-shadow: ${({ shadow }) => shadow};
  background-position: ${({ backgroundPosition }) => backgroundPosition};
`;

export default Image;
