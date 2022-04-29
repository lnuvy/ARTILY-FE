import styled from "styled-components";
import React from "react";
import theme from "../styles/theme";

const Image = (props) => {
  const {
    shape,
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
  };

  if (shape === "circle") {
    return <ImageCircle onClick={onClick} {...styles}></ImageCircle>;
  }
  return <ImageSqure onClick={onClick} {...styles}></ImageSqure>;
};

Image.defaultProps = {
  shape: false,
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
`;

export default Image;
