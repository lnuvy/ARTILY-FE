import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Setprofile = () => {
  return (
    <React.Fragment>
      <h2>프로필 설정</h2>

      <ProfileImg alt="profile" src="../images/emptyimage.jpg"></ProfileImg>
      <ImgBox>
        <label htmlFor="image">프로필 사진 바꾸기</label>
        <input type="file" id="image" />
      </ImgBox>

      <div>
        <label>닉네임</label>
        <input type="text"></input>
      </div>
      <div>
        <label>웹사이트</label>
        <input type="text"></input>
      </div>
      <div>
        <label>소개</label>
        <input type="text"></input>
      </div>
      <button>다음</button>
      <p
        onClick={() => {
          history.push("/");
        }}
      >
        나중에 할래요
      </p>
    </React.Fragment>
  );
};

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #ddd;
`;
const ImgBox = styled.div`
  label {
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #666;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 2px solid #666;
    border-radius: 0.25em;
  }
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default Setprofile;
