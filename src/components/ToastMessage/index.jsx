import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage } from "../../../redux/modules/ToastMessage";
import { Text } from "../../elements";
import ToastMessageStyle from "./Style";

// 판매글 찜할때, 리뷰의 좋아요 누를때, 판매완료 확정했을때, 프로필 수정완료했을때 등등 사용할 수 있을거같습니다
const ToastMessage = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.toastMessage.Message);
  const text = useSelector((state) => state.toastMessage.text);

  const setTimeMessage = () => {
    if (message) {
      setTimeout(() => {
        dispatch(fetchMessage({ Message: false, text: "" }));
      }, 2000);
    }
  };

  // 2초 뒤 자동으로 디스패치됨
  useEffect(() => {
    setTimeMessage();
  }, [message]);

  return (
    <>
      {message && (
        <ToastMessageStyle>
          <Text h2>{text}</Text>
        </ToastMessageStyle>
      )}
    </>
  );
};

export default ToastMessage;
