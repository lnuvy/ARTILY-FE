import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button, Image, Wrap } from "../elements";
import { history } from "../redux/configureStore";
// import { actionCreators as userActions } from "../redux/modules/user";
import { setProfileImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "../shared/ToastMessage";
import { Front, Back } from "../shared/NicknameDummy.js";
//아이콘
import { Refresh } from "../assets/icons";
import { getUserInfo, setProfileDB } from "../redux/modules/user";
import Swal from "sweetalert2";
const Setprofile = () => {
  const dispatch = useDispatch();

  const fileInput = useRef();
  const preview = useSelector((state) => state.image.preview);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user.nickname === "") {
      // window.location.reload();
      // window.location.replace("/");
    }
  }, [user.nickname]);

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
    console.log(reader);
    const file = fileInput.current.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setProfileImage(reader.result));
    };
  };
  const editUser = () => {
    // 닉네임 3 ~ 8 자로 제한
    if (nickname.length < 3 || nickname.length > 8) {
      Swal.fire({
        title: "Oops!",
        text: "유효한 닉네임 길이는 3~8자 입니다.",
        timer: 2500,
        icon: "warning",
      });
      return;
    }
    const file = fileInput.current.files[0];
    //새로운 객체 생성
    const formData = new FormData();

    formData.append("profileImage", file);
    formData.append("nickname", nickname);

    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(setProfileDB(formData, "goDetail"));
  };

  return (
    <>
      <Flex jc="center" margin="2em 0 0 0">
        <h2>ARTILY</h2>
      </Flex>
      <Flex jc="center" margin="0 0 2em 0">
        <p>내 프로필을 만들어주세요!</p>
      </Flex>
      <Wrapprofile>
        <Flex jc="center" margin="50px 0">
          <Image
            alt="profile"
            width="120px"
            height="120px"
            br="60px"
            border="1px solid #999"
            src={preview ? preview : ""}
          ></Image>

          <ImgBox>
            <label htmlFor="image">
              <img src="../../images/edit.png" alt="파일 선택" />
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
          <Text textAlign="left" fg="1">
            닉네임
          </Text>
          <Input
            icon={
              <span onClick={renameRandom}>
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
      <Flex>
        <Button width="90%" margin="20px auto" onClick={editUser}>
          프로필 저장하기
        </Button>
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
    right: -0.5em;
    display: inline-block;
    padding: 0.5em 0.5em;
    line-height: normal;
    vertical-align: middle;
    background-color: ${({ theme }) => `${theme.color.brandColor}`};
    width: 35px;
    height: 35px;
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
export default Setprofile;
