import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal");

  return ReactDOM.createPortal(<div>{children}</div>, el);
};

export default ModalPortal;
