import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage } from "../../redux/modules/ToastMesage";
import ToastMessageStyle from "./Style";

const ToastMessage = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.toastMessage.Message);
  const text = useSelector((state) => state.toastMessage.text);

  function setTimeMessage() {
    if (message) {
      setTimeout(() => {
        dispatch(fetchMessage({ Message: false, text: "" }));
      }, 2500);
    }
  }

  useEffect(() => {
    setTimeMessage();
  }, [message]);

  return (
    <>
      {message && (
        <ToastMessageStyle>
          <p style={{ fontWeight: "bold" }}>{text}</p>
        </ToastMessageStyle>
      )}
    </>
  );
};

export default ToastMessage;
