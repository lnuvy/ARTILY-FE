import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button, Image } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { accrueImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

import { Front, Back } from "../shared/NicknameDummy.js";

const Setprofile = () => {
  const dispatch = useDispatch();

  const fileInput = React.useRef();
  //프로필 사진을 직접 지정한 사진이 아닌 소셜에서 사용하는 프로필 사진도 사용할 수 있도록 유저정보에서 프로필 사진 가져오기
  const getProfile = useSelector((state) => state.user.user);
  console.log(getProfile);
  const preview = useSelector((state) => state.image.represent);
  // console.log(preview);

  const randomnickFront = Front;
  console.log(randomnickFront);
  const randomnickBack = Back;
  console.log(randomnickBack);

  const randomNick =
    randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
    " " +
    randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

  //닉네임은 필수입력이므로 닉네임을 입력하고나서 부터는 프로필 저장버튼이 활성화 됨
  //마지막 input인 자기소개가 비어있을경우 프로필 저장버튼 비활성화

  const [nickname, setNickname] = useState("");
  const [website, setWebsite] = useState("");
  const [introduce, setIntroduce] = useState("");
  useEffect(() => {
    setNickname(getProfile?.nickname);
  }, [getProfile]);
  const selectFile = (e) => {
    const reader = new FileReader();
    console.log(reader);
    const file = fileInput.current.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(accrueImage(reader.result));
    };
  };
  const editUser = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("이미지파일을 등록해주세요!");
      return;
    }
    const file = fileInput.current.files[0];
    console.log(file);

    //새로운 객체 생성
    const formData = new FormData();

    //formData.append(name(키),value(값))
    //값은 문자열로 자동 변환됨. 배열을 넣어도 콤마로 구분한 문자열이 됨. 객체는 넣으면 무시됨

    formData.append("profileImage", file);
    formData.append("nickName", nickname);
    formData.append("website", website);
    formData.append("introduce", introduce);

    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(userActions.editUserDB(formData));
  };

  return (
    <>
      <Flex jc="center">
        <h2>ARTILY</h2>
      </Flex>
      <Flex jc="center">
        <p>내 프로필을 만들어주세요!</p>
      </Flex>
      <Wrapprofile>
        <Flex jc="center">
          <Image
            alt="profile"
            width="120px"
            height="120px"
            br="60px"
            src={preview ? preview : ``}
          ></Image>

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
        <Input value={randomNick} />
        {/* <div> */}
        {/* 버튼을 클릭하면 다른 랜덤 닉네임이 나오게 해야함 */}
        {/* <Button /> */}
        {/* </div> */}
      </Flex>
      {/* 닉네임 입력시 웹사이트 입력창 나오게 */}
      {/* 프로필 저장 버튼도 나타나게 */}
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
          value={introduce || ""}
          onChange={(e) => setIntroduce(e.target.value)}
          maxLength="200"
        ></Textarea>
      </Flex>
      <Button
        outline
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
