import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input, Icon, Text, Wrap, Flex } from "../elements";
import { ImagePreview } from "./index";
import {
  accrueImage,
  removePreview,
  setRepresent,
  clearPreview,
  inputfileObj,
} from "../redux/modules/image";
import styled from "styled-components";

import { AiOutlineCamera } from "react-icons/ai";
import { Camera } from "../assets/icons";

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
    const maxFileCnt = 10;
    const attFileCnt = image.imageArr.length;
    const curFileCnt = files.length;
    const remainFileCnt = maxFileCnt - attFileCnt;

    if (curFileCnt > remainFileCnt) {
      alert("사진은 최대 10장까지 업로드 가능합니다!");
    }
    for (let i = 0; i < Math.min(curFileCnt, remainFileCnt); i++) {
      const file = files[i];
      dispatch(inputfileObj(file));

      if (validation(file)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          dispatch(accrueImage(reader.result));
        };
      }
    }

    function validation(obj) {
      const fileTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/bmp",
        "image/tif",
      ];
      if (obj.name.length > 100) {
        alert("파일명이 100자 이상인 파일은 제외되었습니다.");
        return false;
      } else if (obj.size > 100 * 1024 * 1024) {
        alert("최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다.");
        return false;
      } else if (obj.name.lastIndexOf(".") === -1) {
        alert("확장자가 없는 파일은 제외되었습니다.");
        return false;
      } else if (!fileTypes.includes(obj.type)) {
        alert("첨부가 불가능한 파일은 제외되었습니다.");
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <FileWrap>
      <Flex>
        <Button padding="8px 16px" outline width="64px" height="64px">
          <UploadLabel htmlFor="file">
            <Camera />
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

        <ImagePreview />
      </Flex>
    </FileWrap>
  );
};

export default Preview;

const UploadLabel = styled.label`
  width: 100%;
  height: 100%;
`;

const FileWrap = styled.div`
  overflow: auto;
  overflow-y: hidden;
`;
