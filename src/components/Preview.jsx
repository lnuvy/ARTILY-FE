import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Input } from "../elements";
import {
  accrueImage,
  removePreview,
  setRepresent,
  clearPreview,
} from "../redux/modules/image";

/*
 * @한울 4/30
 *
 */

const Preview = () => {
  const dispatch = useDispatch();
  const fileInput = useRef();

  const selectFile = (e) => {
    const { files } = e.target;

    console.log(files);

    // 한번에 여러개올릴수도 있어서 if문으로 분기
    if (files.length === 1) {
      const reader = new FileReader();
      const file = files[0];
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        dispatch(accrueImage(reader.result));
      };
    } else {
      // 임시 막기 (추후에 Swal 같은거 쓰면 좋을거같습니다)
      if (files.length > 10) {
        alert("사진은 최대 10장까지 업로드 가능합니다!");
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          dispatch(accrueImage(reader.result));
        };
      }

      // reader.onloadend = () => {
      //   dispatch(accrueImage(reader.result));
      // };
    }
  };

  return (
    <>
      <Grid>
        <Button fg="1">
          <label htmlFor="file">이미지 업로드</label>
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
