import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Grid, Image, Text } from "../elements";
import {
  accrueImage,
  removePreview,
  setRepresent,
  clearPreview,
} from "../redux/modules/image";

const ImagePreview = () => {
  const dispatch = useDispatch();
  const { represent, imageArr } = useSelector((state) => state.image);

  const selectRepresent = (image) => {
    dispatch(setRepresent(image));
  };

  const removePreview = () => {
    dispatch();
  };

  return (
    <Grid>
      <Flex fd="column">
        <Image src={represent || null} height="200px" />
        <Text>대표이미지</Text>
      </Flex>
      <Grid gtc="1fr 1fr">
        {imageArr.length !== 0 &&
          imageArr.map((image, i) => {
            return (
              <Flex fd="column" key={`${image.slice(0, 10)}_${i}`}>
                <Image src={image} height="120px" />
                <Button
                  padding="8px 16px"
                  margin="10px 0"
                  onClick={() => selectRepresent(image)}
                >
                  대표이미지로 설정
                </Button>
                <Button padding="8px 16px" margin="10px 0">
                  삭제
                </Button>
              </Flex>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default ImagePreview;
