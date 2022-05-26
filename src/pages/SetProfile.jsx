import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Flex,
  Input,
  Text,
  Textarea,
  Button,
  Image,
  Wrap,
  Grid,
} from "../elements";
import { history } from "../redux/configureStore";
// import { actionCreators as userActions } from "../redux/modules/user";
import { setProfileImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "../shared/ToastMessage";
import { Front, Back } from "../shared/NicknameDummy.js";
//아이콘
import { Refresh } from "../assets/icons";
import { Logo } from "../assets/images";
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
      alert("프로필 이미지를 선택해주세요!");
      return;
    }

    const file = fileInput.current.files[0];
    //새로운 객체 생성
    const formData = new FormData();

    formData.append("profileImage", file);
    formData.append("nickname", nickname);

    // console.log("formData", formData);

    for (var pair of formData.entries()) {
      // console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(setProfileDB(formData, "goDetail"));
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
        {/* 5.19 프로그래스바 작업중 -영경 */}
        <div className="box">
          <Wrap textAlign="center">
            <img src="/images/artily.png" alt="logo" />
            <Text body1 color="#999" margin="20px 0 0 0">
              내 프로필을 완성해주세요!
            </Text>
            <Wrapprofile>
              <Flex jc="center" margin="40px 0">
                <Image
                  alt="profile"
                  width="120px"
                  height="120px"
                  br="60px"
                  shadow="1px 1px 3px #888"
                  src={preview ? preview : ""}
                ></Image>

                <ImgBox>
                  <label htmlFor="image">
                    <img
                      src="../../images/edit.png"
                      alt="파일 선택"
                      onClick={() => {
                        imageCount();
                      }}
                    />
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
            <Flex>
              <Button
                width="90%"
                margin="20px 20px 0 20px"
                onClick={() => {
                  nickCount();
                  editUser();
                }}
              >
                프로필 저장하기
              </Button>
            </Flex>
          </Wrap>
        </div>
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
    right: -0.5em;
    display: inline-block;
    padding: 0.5em 0.5em;
    line-height: normal;
    vertical-align: middle;
    background-color: ${({ theme }) => `${theme.pallete.primary850}`};
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

const Outline = styled.div`
  height: 100vh;
  position: relative;
  .box {
    /* background-color: #ddd; */
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* translate(x축,y축) */
    //요소의 가장 좌측과 상단을 기준으로 50%를 이동하는 것이므로, 요소자체를 마이너스 값을 통해 다시 절반을 좌측, 상단으로 당겨오는 것.
    //transform 값을 적용하기 전에는 왼쪽 위 꼭짓점이 정 중앙에 배치된 상태.
  }
`;
const ProgressBar = styled.div`
  width: ${(props) => props.width};
  height: 5px;
  background-color: ${({ theme }) => theme.pallete.primary850};
  transition: width 1s;
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 1;
`;
const BaseProgress = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.pallete.gray1};
  position: absolute;
  top: 30px;
  left: 0;
`;
export default Setprofile;
