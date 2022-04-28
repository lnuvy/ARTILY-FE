import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const {
    shape,
    src,
    size,
    width,
    height,
    margin,
    paddingTop,
    onClick,
    className,
  } = props;

  const styles = {
    src,
    size,
    width,
    height,
    margin,
    paddingTop,
    className,
  };

  if (shape === "circle") {
    return (
      <ImageCircle
        {...styles}
        onClick={onClick}
        className={className}
      ></ImageCircle>
    );
  }

  if (shape === "input") {
    return (
      <ImageInput
        {...styles}
        onClick={onClick}
        className={className}
        type="file"
      ></ImageInput>
    );
  }

  if (shape === "square") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  // 기존 정사각형을 square로 변경 후 일반 사각형을 rectangle로 변경
  if (shape === "rectangle") {
    return <ImageRectangle {...styles}></ImageRectangle>;
  }
};

Image.defaultProps = {
  shape: "circle",
  src: "https://file.mk.co.kr/meet/neds/2021/12/image_readtop_2021_1116084_16386257784873056.jpg",
  // src: "https://scontent-atl3-1.cdninstagram.com/v/t51.29350-15/278070637_1173735450111264_6880398074226860271_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=kOfWh5OYa1EAX_jXs71&_nc_ht=scontent-atl3-1.cdninstagram.com&oh=00_AT-53J2hLOxyOjdOTfvuaEuNirOdcU4p_Xxv91nj7QNl-A&oe=6260AB31";
  size: 36,
  paddingTop: "75%",
  width: "100%",
  height: "auto",
  onClick: () => {},
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 100px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: ${(props) => props.paddingTop};
  overflow: hidden;
  background-image: url(${(props) => props.src});
  background-size: cover;
  /* background-position: center; */
`;

const ImageRectangle = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  object-fit: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  border: 1px solid #d5d5d5;
  background-image: url(${(props) => props.src});
  background-size: cover;
  // margin: 4px;
`;

const ImageInput = styled.input`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  border: 1px solid #d5d5d5;
  background-image: url(${(props) => props.src});
  background-size: cover;
  // margin: 4px;
  &[type="file"]::file-selector-button {
    display: none;
  }
`;

export default Image;
