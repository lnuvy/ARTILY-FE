import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Grid, Image, Text, Wrap, Icon } from "../elements";
import {
  accrueImage,
  removePreview,
  setRepresent,
  clearPreview,
} from "../redux/modules/image";
import styled from "styled-components";

const ImagePreview = () => {
  const dispatch = useDispatch();
  const { represent, imageArr } = useSelector((state) => state.image);

  const selectRepresent = (image) => {
    dispatch(setRepresent(image));
  };

  const removeImage = (image) => {
    dispatch(removePreview(image));
  };

  return (
    <Grid
      gtc="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
      cg="0px"
      margin="0 0 0 16px"
    >
      {imageArr.length !== 0 &&
        imageArr.map((image, i) => {
          // console.log(image);
          return (
            <Grid gtc="auto auto">
              <Wrap position="relative" key={`${image.slice(0, 10)}_${i}`}>
                <Image
                  br="8px"
                  imageArr
                  src={image}
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
                  onClick={() => removeImage(image)}
                >
                  <Icon width="12px" height="12px" />
                </Button>
                {i === 0 && <MainImageLabel>대표 사진</MainImageLabel>}
              </Wrap>
            </Grid>
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
