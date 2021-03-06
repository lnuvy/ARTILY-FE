import React, { useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsPaperclip } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Button } from "../elements";
import { accrueImage, setPreview } from "../redux/modules/image";
const MySwal = withReactContent(Swal);
const ChatFileInput = () => {
  const dispatch = useDispatch();
  const fileInput = useRef();

  const selectFile = (e) => {
    const { files } = e.target;
    // 한번에 여러개 올릴수도 있어서 if문으로 분기
    if (files.length === 1) {
      const reader = new FileReader();
      const file = files[0];
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        dispatch(setPreview(reader.result));
      };
    } else {
      if (files.length > 10) {
        MySwal.fire({
          icon: "warning",
          text: "사진은 최대 10장까지 업로드 가능합니다.",
        });
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
    }
  };

  return (
    <>
      <Button outline padding="4px" margin="4px">
        <label htmlFor="chatfile">
          <BsPaperclip size={30} />
        </label>
      </Button>
      <input
        style={{ display: "none" }}
        id="chatfile"
        type="file"
        multiple
        onChange={selectFile}
        ref={fileInput}
      />
    </>
  );
};

export default ChatFileInput;
