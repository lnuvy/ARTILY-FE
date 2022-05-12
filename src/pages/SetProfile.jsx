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
import { nicknameCheck } from "../shared/regCheck/RegCheck";
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
    if (!nicknameCheck(nickname)) {
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
            src={preview ? preview : ""}
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
      <Wrap padding="0 20px 30px 20px">
        <Flex>
          <Text textAlign="center" fg="1">
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
        <Button width="90%" outline margin="20px auto" onClick={editUser}>
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
export default Setprofile;
