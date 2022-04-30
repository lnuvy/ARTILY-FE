import React from "react";
import { Button } from "../elements";
import { history } from "../redux/configureStore";
const MyPage = () => {
  return (
    <>
      <div>MyPage</div>
      <Button
        onClick={() => {
          history.push("/login");
        }}
      >
        로그인
      </Button>
    </>
  );
};

export default MyPage;
