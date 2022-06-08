import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Button, Image, Wrap, Icon } from "../elements";
import { LogoBig } from "../assets/images/index";

// import { actionCreators as userActions } from "../redux/modules/user";
import { setProfileImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

import { Front, Back } from "../shared/NicknameDummy.js";
//아이콘
import { Refresh, Edit } from "../assets/icons";
import { setProfileDB } from "../redux/modules/user";
import Swal from "sweetalert2";
import { nicknameCheck } from "../shared/regCheck/RegCheck";
import theme from "../styles/theme";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const Setprofile = () => {
  const dispatch = useDispatch();

  const fileInput = useRef();
  const preview = useSelector((state) => state.image.preview);

  //랜덤 닉네임 생성
  const randomnickFront = Front;
  const randomnickBack = Back;
  const randomNick =
    randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
    " " +
    randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

  const [nickname, setNickname] = useState(randomNick);
  const renameRandom = () => {
    const addNick =
      randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
      " " +
      randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

    setNickname(addNick);
  };

  const selectFile = (e) => {
    const reader = new FileReader();
    // console.log(reader);
    const file = fileInput.current.files[0];
    // console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setProfileImage(reader.result));
    };
  };

  const editUser = () => {
    if (!nicknameCheck(nickname)) {
      return;
    }
    if (!preview) {
      MySwal.fire({
        icon: "warning",
        text: "프로필 이미지를 설정해주세요.",
      });
      return;
    }

    const file = fileInput.current.files[0];

    const formData = new FormData();

    formData.append("profileImage", file);
    formData.append("nickname", nickname);

    for (var pair of formData.entries()) {
    }

    dispatch(setProfileDB(formData, "goDetail"));
    nickCount();
  };
  const [count, setCount] = useState(0);

  const imageCount = () => {
    setCount(1);
  };
  const nickCount = () => {
    setCount(2);
  };
  return (
    <>
      <BaseProgress />
      <ProgressBar width={(count / 4) * 100 + "%"} />
      <Outline>
        <Wrap margin="80px 0 125px 0" textAlign="center">
          <LogoBig />
          <Text body1 color={theme.pallete.gray2} margin="10px 0 0 0">
            내 프로필을 완성해주세요!
          </Text>
          <Wrapprofile>
            <Flex jc="center" margin="40px 0">
              <Image
                alt="profile"
                width="120px"
                height="120px"
                br="60px"
                src={preview ? preview : ""}
              ></Image>

              <ImgBox>
                <label htmlFor="image">
                  <Icon
                    onClick={() => {
                      imageCount();
                    }}
                  >
                    <Edit color="white" size="20" />
                  </Icon>
                </label>
                <input
                  type="file"
                  id="image"
                  ref={fileInput}
                  onChange={selectFile}
                />
              </ImgBox>
            </Flex>
          </Wrapprofile>
          <Wrap padding="0 20px 30px 20px">
            <Flex>
              <Text textAlign="left" width="80px">
                닉네임
              </Text>
              <Input
                padding="8px"
                iconRight="4px"
                icon={
                  <span
                    onClick={() => {
                      renameRandom();
                    }}
                  >
                    <Refresh />
                  </span>
                }
                square
                width="100%"
                border="1px solid #d3d3d3"
                br="6px"
                type="text"
                fg="1"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Flex>
          </Wrap>
          <BottomWrap>
            <Button
              width="90%"
              margin="20px 20px 0 20px"
              onClick={() => {
                editUser();
              }}
            >
              프로필 저장하기
            </Button>
          </BottomWrap>
        </Wrap>
      </Outline>
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
    right: 0;
    display: inline-block;
    padding: 5px;
    line-height: normal;
    vertical-align: middle;
    background-color: ${theme.color.brandColor};
    width: 30px;
    height: 30px;
    cursor: pointer;
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

const Outline = styled.div`
  height: 100vh;
  position: relative;
  .box {
    width: 100%;
    position: absolute;
  }
`;

const ProgressBar = styled.div`
  width: ${(props) => props.width};
  height: 5px;
  background-color: ${({ theme }) => theme.pallete.primary850};
  transition: width 1s;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 1;
`;

const BaseProgress = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.pallete.gray1};
  position: absolute;
  top: 0px;
  left: 0;
`;

const BottomWrap = styled.div`
  position: fixed;
  bottom: 0;
  padding: 16px 0;
  width: 100%;
  max-width: ${theme.view.maxWidth};
  background-color: white;
  height: fit-content;
`;

export default Setprofile;
