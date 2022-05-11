//소셜 로그인후 기본 프로필(사진, 닉네임) 설정=> 나머지 프로필 정보 설정하는 페이지

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button, Image, Wrap } from "../elements";
import { history } from "../redux/configureStore";
// import { actionCreators as userActions } from "../redux/modules/user";
import { getUserInfo, setProfileDB } from "../redux/modules/user";
import { setProfileImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "../shared/ToastMessage";
import { Front, Back } from "../shared/NicknameDummy.js";
//임시 아이콘
import { BsPlusSquare } from "react-icons/bs";
const DetailProfile = () => {
  const dispatch = useDispatch();
  const getProfile = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const fileInput = useRef();

  const [nickname, setNickname] = useState(getProfile?.nickname || "");
  const [website1, setWebsite1] = useState("");
  const [website2, setWebsite2] = useState("");
  const [website3, setWebsite3] = useState("");
  const [introduce, setIntroduce] = useState("");

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const selectFile = () => {
    const reader = new FileReader();
    console.log(reader);
    const file = fileInput.current.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setProfileImage(reader.result));
    };
  };

  const editUser = () => {
    const file = fileInput.current.files[0];
    console.log(file);
    //새로운 객체 생성
    const formData = new FormData();

    //formData.append(name(키),value(값))
    //값은 문자열로 자동 변환됨. 배열을 넣어도 콤마로 구분한 문자열이 됨. 객체는 넣으면 무시됨
    // formData.append("profileImage", file);
    // formData.append("nickName", nickname);
    formData.append("snsUrl", [website1]);
    formData.append("snsUrl", [website2]);
    formData.append("snsUrl", [website3]);
    formData.append("introduce", introduce);

    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(setProfileDB(formData));
  };

  return (
    <>
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
            src={
              getProfile && getProfile.profileImage
                ? getProfile.profileImage
                : ""
            }
          />
        </Flex>
      </Wrapprofile>
      <ImgBox>
        <label htmlFor="image">🖍</label>
        <input type="file" id="image" ref={fileInput} onChange={selectFile} />
      </ImgBox>
      <Wrap padding="20px 20px">
        <Flex padding="10px 0">
          <Text fg="1">닉네임</Text>
          <Input square br="6px" value={nickname} readOnly></Input>
        </Flex>
        <Flex>
          <Text fg="1">웹사이트</Text>
          <Input
            square
            br="6px"
            fg="0"
            type="text"
            name="text"
            placeholder="instargram 주소"
            value={website1 || ""}
            icon={
              <BsPlusSquare
                size={28}
                color="#555"
                onClick={() => {
                  setVisible1(!visible1);
                }}
              />
            }
            onChange={(e) => setWebsite1(e.target.value)}
          ></Input>
        </Flex>
        {/* 나머지 input은 안보였다가 입력값이 들어갔을때 나타나야 함 */}

        {visible1 && (
          <Flex margin="10px 0">
            <Text fg="1"></Text>
            <Input
              square
              br="6px"
              fg="0"
              type="text"
              placeholder="Behance 주소"
              value={website2 || ""}
              icon={
                <BsPlusSquare
                  size={28}
                  color="#555"
                  onClick={() => {
                    setVisible2(!visible2);
                  }}
                />
              }
              onChange={(e) => setWebsite2(e.target.value)}
            ></Input>
          </Flex>
        )}
        {visible2 && (
          <Flex>
            <Text fg="1"></Text>
            <Input
              square
              br="6px"
              fg="0"
              type="text"
              placeholder="other website"
              value={website3 || ""}
              onChange={(e) => setWebsite3(e.target.value)}
            ></Input>
          </Flex>
        )}
        <Flex>
          <Text fg="1">소개</Text>
          <Textarea
            width="100%"
            fg="0"
            value={introduce || ""}
            onChange={(e) => setIntroduce(e.target.value)}
            maxLength="100"
            br="6px"
          ></Textarea>
        </Flex>
      </Wrap>
      <Button
        width="90%"
        type="submit"
        outline
        margin="20px"
        onClick={() => {
          window.alert("프로필이 저장되었습니다!");
          editUser();
        }}
      >
        프로필 저장하기
      </Button>
      <Flex
        jc="center"
        onClick={() => {
          window.alert(
            "프로필 설정 완료는 다음에 할게요! 메인홈으로 이동합니다"
          );
          history.push("/");
        }}
      >
        <Text body3 textDeco="underline">
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
export default DetailProfile;
