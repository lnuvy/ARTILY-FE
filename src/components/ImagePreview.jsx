import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Image, Wrap } from "../elements";
import {
  removeFileObj,
  removePreview,
  accrueImage,
  accrueImageDelete,
  resetImageDt,
  addImageDt,
} from "../redux/modules/image";
import { Close } from "../assets/icons/index";
import styled from "styled-components";

import { AiOutlineClose } from "react-icons/ai";
import theme from "../styles/theme";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const ImagePreview = (props) => {
  const dispatch = useDispatch();

  const { imageArr } = props;

  const removeImage = async (image, key) => {
    if (key === 0) {
      MySwal.fire({
        icon: "warning",
        text: "대표 이미지는 삭제할 수 없습니다.",
      });
      return;
    }

    if (key < imageArr.length) {
      dispatch(addImageDt(imageArr[key].imageUrl));
    }

    const arr = [...imageArr];

    const filtered = arr.filter(function (v, i) {
      {
        if (i === key) {
          return;
        } else {
          return v;
        }
      }
    });
    dispatch(accrueImageDelete(filtered));
  };

  return (
    <Grid
      gtc="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
      cg="16px"
      margin="0 0 0 16px"
    >
      {imageArr &&
        imageArr.length > 0 &&
        imageArr.map((image, i) => {
          return (
            <Wrap width="64px" position="relative" key={i}>
              <Image
                border={`1px solid ${theme.pallete.gray1}`}
                br="8px"
                imageArr
                src={image.imageUrl ? image.imageUrl : image}
                height="64px"
                width="64px"
              />
              <Button
                padding="1px"
                position="absolute"
                top="-6px"
                right="-6px"
                bc="black"
                width="16px"
                height="16px"
                onClick={() => removeImage(image, i)}
              >
                <Close size={12} color="white" />
              </Button>
              {i === 0 && <MainImageLabel>대표 사진</MainImageLabel>}
            </Wrap>
          );
        })}
    </Grid>
  );
};

export default ImagePreview;

const MainImageLabel = styled.div`
  position: absolute;
  bottom: 0;
  background-color: ${theme.pallete.gray4};
  color: white;
  width: 100%;
  border-radius: 0px 0px 8px 8px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
`;
