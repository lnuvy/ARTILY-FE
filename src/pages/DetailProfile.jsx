//소셜 로그인후 기본 프로필(사진, 닉네임) 설정=> 나머지 프로필 정보 설정하는 페이지

import React, { useEffect, useState } from "react";
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
  // console.log(getProfile);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    setNickname(getProfile?.nickname);
  }, [getProfile]);

  const fileInput = React.useRef();
  //이미 앞에서 프로필 사진이랑 닉네임은 저장됐을테니까 불러오자

  //랜덤 닉네임 생성
  const randomnickFront = Front;
  const randomnickBack = Back;

  const randomNick =
    randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
    " " +
    randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

  const [nickname, setNickname] = useState(
    getProfile?.nickname ? getProfile.nickname : randomNick
  );
  const [snsUrl, setSnsUrl] = useState("");
  const [website2, setWebsite2] = useState("");
  const [website3, setWebsite3] = useState("");
  const [introduce, setIntroduce] = useState("");

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const selectFile = (e) => {
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
    //새로운 객체 생성
    const formData = new FormData();

    //formData.append(name(키),value(값))
    //값은 문자열로 자동 변환됨. 배열을 넣어도 콤마로 구분한 문자열이 됨. 객체는 넣으면 무시됨

    // formData.append("profileImage", file);
    // formData.append("nickName", nickname);
    formData.append("website1", snsUrl);
    formData.append("website2", website2);
    formData.append("website3", website3);
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
          ></Image>
        </Flex>
      </Wrapprofile>
      <Wrap padding="20px 20px">
        <Flex padding="10px 0">
          <Text fg="1">닉네임</Text>
          <Input
            square
            br="6px"
            value={nickname || ""}
            onChange={(e) => setNickname(e.target.value)}
          ></Input>
        </Flex>
        <Flex>
          <Text fg="1">웹사이트 1</Text>
          <Input
            square
            br="6px"
            fg="0"
            type="text"
            name="text"
            placeholder="instargram 주소"
            value={snsUrl || ""}
            icon={
              <BsPlusSquare
                size={28}
                color="#555"
                onClick={() => {
                  setVisible1(!visible1);
                }}
              />
            }
            onChange={(e) => setSnsUrl(e.target.value)}
          ></Input>
        </Flex>
        {/* 나머지 input은 안보였다가 입력값이 들어갔을때 나타나야 함 */}

        {visible1 && (
          <Flex margin="10px 0">
            <Text fg="1">웹사이트 2</Text>
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
            <Text fg="1">웹사이트 3</Text>
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
        margin="20px auto"
        onClick={() => {
          window.alert("프로필이 저장되었습니다!");
          editUser();
          // history.push("/");
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
