//마이페이지에서 수정하기를 눌렀을때 나오는 페이지 입니다
//SetProfile 페이지와 다름
//이미 설정 되어있는 프로필 정보를 불러와야 함
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button, Image, Wrap } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { accrueImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

import { Front, Back } from "../shared/NicknameDummy.js";

const MypageEdit = () => {
  const dispatch = useDispatch();

  const fileInput = React.useRef();
  const getProfile = useSelector((state) => state.user.user);
  console.log(getProfile);
  const preview = useSelector((state) => state.image.represent);
  // console.log(preview);

  const randomnickFront = Front;
  // console.log(randomnickFront);
  const randomnickBack = Back;
  // console.log(randomnickBack);

  const randomNick =
    randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
    " " +
    randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

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
    // if (!fileInput.current || fileInput.current.files.length === 0) {
    //   window.alert("이미지파일을 등록해주세요!");
    // }
    const file = fileInput.current.files[0];
    console.log(file);

    //새로운 객체 생성
    const formData = new FormData();

    //formData.append(name(키),value(값))
    //값은 문자열로 자동 변환됨. 배열을 넣어도 콤마로 구분한 문자열이 됨. 객체는 넣으면 무시됨

    formData.append("profileUrl", file);
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
      <Flex>
        <Text h2 bold margin="10px">
          프로필 수정
        </Text>
      </Flex>
      <Wrapprofile>
        <Flex jc="center">
          <Image
            alt="profile"
            width="120px"
            height="120px"
            br="60px"
            src=""
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
      <Wrap margin="0 10px">
        <Flex jc="center">
          <Text fg="1">닉네임</Text>
          {/* <Input value={randomNick} /> */}
          {/* 일단 기본적으로는 소셜로그인 시 가져오는 기본 닉네임으로 설정 */}
          <Input fg="0" />
        </Flex>
        {/* 닉네임 입력시 웹사이트 입력창 나오게 */}
        {/* 프로필 저장 버튼도 나타나게 */}
        <Flex jc="center">
          <Text fg="1">웹사이트</Text>
          <Input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          ></Input>
        </Flex>
        {/* 웹사이트 주소 입력시 자기소개 입력창 나오게 */}
        <Flex jc="center">
          <Text fg="1">소개</Text>
          <Textarea
            // value={introduce || ""}
            onChange={(e) => setIntroduce(e.target.value)}
            maxLength="200"
          ></Textarea>
        </Flex>
      </Wrap>
      <Button
        width="90%"
        margin="auto"
        onClick={() => {
          window.alert("프로필이 저장되었습니다!");
          editUser();
          history.push("/");
        }}
      >
        수정 완료
      </Button>
      <Text
        textAlign="center"
        margin="10px 0 0 0"
        body3
        textDeco="underline"
        onClick={() => {
          history.push("/");
        }}
      >
        다음에 할래요
      </Text>
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

export default MypageEdit;
