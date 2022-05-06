//소셜 로그인후 기본 프로필(사진, 닉네임) 설정=> 나머지 프로필 정보 설정하는 페이지

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button, Image, Wrap } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { accrueImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "../shared/ToastMessage";
import { Front, Back } from "../shared/NicknameDummy.js";

const DetailProfile = () => {
  const dispatch = useDispatch();

  const fileInput = React.useRef();
  //이미 앞에서 프로필 사진이랑 닉네임은 저장됐을테니까 불러오자
  const getProfile = useSelector((state) => state.user.user);
  console.log(getProfile);

  //랜덤 닉네임 생성
  const randomnickFront = Front;
  const randomnickBack = Back;

  const randomNick =
    randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
    " " +
    randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

  const [nickname, setNickname] = useState("");
  const [website, setWebsite] = useState("");
  const [introduce, setIntroduce] = useState("");

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
    dispatch(userActions.setProfileDB(formData));
  };

  useEffect(() => {
    setNickname(getProfile?.nickname);
    setWebsite(getProfile?.website);
    setIntroduce(getProfile?.introduce);
  }, []);
  return (
    <>
      {/* 이 페이지에서는 사진이랑 닉네임은 수정이 안되는게 맞겠죠? */}
      <Flex jc="center" margin="1em 0 0 0">
        <h2>ARTILY</h2>
      </Flex>
      <Flex jc="center" margin="0 0 2em 0">
        <p>내 프로필을 만들어주세요!</p>
      </Flex>
      <Wrapprofile>
        <Flex jc="center">
          <Image
            alt="profile"
            width="120px"
            height="120px"
            br="60px"
            src={getProfile.profileImage ? getProfile.profileImage : ""}
          ></Image>
        </Flex>
      </Wrapprofile>

      <Wrap padding="0 10px;">
        <Flex>
          <Text fg="1">닉네임</Text>
          {/* 일단 기본적으로는 소셜로그인 시 가져오는 기본 닉네임으로 설정 */}
          <Input
            type="text"
            fg="0"
            value={randomNick || ""}
            onChange={(e) => setNickname(randomNick)}
          />
          {/* 닉네임 입력시 웹사이트 입력창 나오게 */}
          {/* 프로필 저장 버튼도 나타나게 */}
        </Flex>
        <Flex>
          <Text fg="1">웹사이트</Text>
          <Input
            fg="0"
            type="text"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          ></Input>
          <Button>+</Button>
        </Flex>
        <Flex>
          <Input
            fg="0"
            type="text"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          ></Input>
          <Button>+</Button>
        </Flex>
        <Flex>
          <Input
            fg="0"
            type="text"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          ></Input>
          <Button>+</Button>
        </Flex>

        <Flex>
          <Text fg="1">소개</Text>
          <Textarea
            width="100%"
            fg="0"
            // value={introduce || ""}
            onChange={(e) => setIntroduce(e.target.value)}
            maxLength="200"
          ></Textarea>
        </Flex>
      </Wrap>
      <Button
        width="90%"
        type="submit"
        outline
        margin="20px auto"
        onClick={() => {
          window.alert("프로필이 저장되었습니다!");
          editUser();
          window.confirm("더 자세한 프로필을 작성하시겠어요?");
          history.push("/mypage/edit");
        }}
      >
        프로필 저장하기
      </Button>
      <Flex jc="center">
        <Text
          body3
          textDeco="underline"
          onClick={() => {
            history.push("/");
          }}
        >
          다음에 할래요
        </Text>
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
export default DetailProfile;
