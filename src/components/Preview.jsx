import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input, Icon, Text } from "../elements";
import {
  accrueImage,
  removePreview,
  setRepresent,
  clearPreview,
} from "../redux/modules/image";
import styled from "styled-components";

/*
 * @한울 4/30
 *
 */

const Preview = () => {
  const dispatch = useDispatch();
  const fileInput = useRef();
  const image = useSelector((state) => state.image);

  const selectFile = (e) => {
    const { files } = e.target;

    console.log(files.length);
    console.log(image.imageArr.length);

    if (image.imageArr.length > 9) {
      alert("사진은 최대 10장까지 업로드 가능합니다!");
    } else {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];
        console.log(file);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          dispatch(accrueImage(reader.result));
        };
      }
    }

    // image.imageArr.map((v) => {
    //   const reader = new FileReader();
    //   const file = files[files.length - 1];
    //   console.log(file);
    //   reader.readAsDataURL(file);
    //   reader.onloadend = () => {
    //     if (v === reader.result) {
    //       alert("이미 업로드한 사진입니다.");
    //       return;
    //     }
    //   };
    // });

    // // 한번에 여러개올릴수도 있어서 if문으로 분기
    // if (files.length === 1) {
    //   const reader = new FileReader();
    //   const file = files[0];
    //   reader.readAsDataURL(file);
    //   reader.onloadend = () => {
    //     dispatch(accrueImage(reader.result));
    //   };
    // } else {
    //   // 임시 막기 (추후에 Swal 같은거 쓰면 좋을거같습니다)

    //   // reader.onloadend = () => {
    //   //   dispatch(accrueImage(reader.result));
    //   // };
    // }
  };

  return (
    <>
      <Grid>
        <Button outline>
          <UploadLabel htmlFor="file">
            <Icon bc="black" />
            <Text>{image.imageArr.length}/10</Text>
          </UploadLabel>
        </Button>
        <input
          style={{ display: "none" }}
          id="file"
          type="file"
          multiple
          onChange={selectFile}
          ref={fileInput}
        />
      </Grid>
    </>
  );
};

export default Preview;

const UploadLabel = styled.label`
  width: 100%;
  height: 100%;
`;
