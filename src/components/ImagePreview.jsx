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
import styled from "styled-components";

import { AiOutlineClose } from "react-icons/ai";

const ImagePreview = (props) => {
  const dispatch = useDispatch();

  const { imageArr } = props;

  const removeImage = async (image, key) => {
    if (key === 0) {
      alert("대표이미지는 삭제할 수 없어요!");
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

    // console.log(imageArr);
    // console.log(filtered);
    dispatch(accrueImageDelete(filtered));

    // 수정단계의 대표이미지일때
    // if (
    //   image.includes("https://artily-bucket.s3.ap-northeast-2") &&
    //   image === imageArr[0].imageUrl
    // ) {
    //   alert("대표이미지는 삭제할수없어요!");
    //   return;
    // }
    // const fileIndex = imageArr.findIndex((img) => img === image);
    // const testFile = await convertURLtoFile(image);
    // console.log(testFile);

    // dispatch(removePreview(image));

    // dispatch(removeFileObj(fileIndex));
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
                br="8px"
                imageArr
                src={image.imageUrl ? image.imageUrl : image}
                height="64px"
                width="64px"
              />
              <Button
                padding="2px"
                position="absolute"
                top="-6px"
                right="-6px"
                bc="black"
                width="fit-content"
                height="12px"
                onClick={() => removeImage(image, i)}
              >
                <AiOutlineClose size={12} />
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
  background-color: black;
  color: white;
  width: 100%;
  border-radius: 0px 0px 8px 8px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
`;
