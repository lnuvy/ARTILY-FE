import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as previewActions } from "../redux/modules/previewImg";
import { useDispatch, useSelector } from "react-redux";
const Setprofile = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [website, setWebsite] = useState("");
  const [introduce, setIntroduce] = useState("");

  const fileInput = React.useRef();
  //프로필 사진을 직접 지정한 사진이 아닌 소셜에서 사용하는 프로필 사진도 사용할 수 있도록 유저정보에서 프로필 사진 가져오기
  const user = useSelector((state) => state.user);
  console.log(user);
  const preview = useSelector((state) => state.previewImg.preview);
  // console.log(preview);

  //꼭 입력하지 않아도 넘어갈수 있게 해야하나?
  //input값을 차례로 입력할때마다 다음 input이 나오려면 입력을 안할수가 없음
  //세가지를 모두 채워야만 프로필 저장버튼이 활성화 됨
  //마지막 input인 자기소개가 비어있을경우 프로필 저장버튼 비활성화

  // //웹사이트가 비어있을 경우 경고창
  // if (setNickname === "") {
  //   window.alert("닉네임을 입력해주세요!");
  // }
  // //웹사이트가 비어있을 경우 경고창
  // if (setWebsite === "") {
  //   window.alert("웹사이트를 입력해주세요!");
  // }
  //자기소개가 비어있을 경우 경고창
  if (setIntroduce === "") {
    window.alert("자기소개를 입력해주세요!");
    return;
  }
  const selectFile = (e) => {
    const reader = new FileReader();
    console.log(reader);
    const file = fileInput.current.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(previewActions.settingPreview(reader.result));
    };
  };
  const editUser = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("이미지파일을 등록해주세요!");
      return;
    }
    const file = fileInput.current.files[0];
    console.log(file);
  };
  return (
    <>
      <Flex jc="center">
        <h1>ARTILY</h1>
      </Flex>
      <Flex jc="center">
        <p>내 프로필을 만들어주세요!</p>
      </Flex>
      <Wrapprofile>
        <Flex jc="center">
          <ProfileImg
            alt="profile"
            src={preview ? preview : "../../images/emptyimage.jpg"}
          ></ProfileImg>

          <ImgBox>
            <label htmlFor="image">🖍</label>
            <input
              type="file"
              id="image"
              ref={fileInput}
              onChange={selectFile}
            />
          </ImgBox>
        </Flex>
      </Wrapprofile>
      <Flex jc="center">
        <label>닉네임</label>
        <Input
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <div>
          <Button />
        </div>
        {/* <div>
          <Text>
            {determiners[Math.floor(Math.random() * determiners.length)] +
              " " +
              animals[Math.floor(Math.random() * animals.length)]}
          </Text>
        </div> */}
      </Flex>
      {/* 닉네임 입력시 웹사이트 입력창 나오게 */}
      <Flex jc="center">
        <label>웹사이트</label>
        <Input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        ></Input>
        <div>
          <Button />
        </div>
      </Flex>
      {/* 웹사이트 주소 입력시 자기소개 입력창 나오게 */}
      <Flex jc="center">
        <label>소개</label>
        <Textarea
          // value={introduce}
          onChange={(e) => setIntroduce(e.target.value)}
          maxLength="200"
        ></Textarea>
      </Flex>
      <Button
        margin="auto"
        onClick={() => {
          window.alert("프로필이 저장되었습니다!");
          editUser();
          history.push("/");
        }}
      >
        프로필 저장하기
      </Button>
      <Flex jc="center">
        <p
          onClick={() => {
            history.push("/");
          }}
        >
          나중에 할래요
        </p>
      </Flex>
    </>
  );
};

const Wrapprofile = styled.div`
  position: relative;
  margin: auto;
  width: 120px;
`;
const ProfileImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  border: 2px solid #999;
`;
const ImgBox = styled.div`
  label {
    position: absolute;
    bottom: 0;
    right: -1em;
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #666;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 1px solid #666;
    border-radius: 50%;
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
// const Changebtn = styled.button`
//   position: absolute;
//   right: 0;
//   width: 30px;
//   height: 30px;
//   background-color: #444;
// `;
export default Setprofile;
