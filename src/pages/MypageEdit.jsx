//마이페이지에서 수정하기를 눌렀을때 나오는 페이지 입니다
//SetProfile 페이지와 다름
//이미 설정 되어있는 프로필 정보를 불러와야 함
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button, Image, Wrap } from "../elements";
import { history } from "../redux/configureStore";
// import { actionCreators as userActions } from "../redux/modules/user";
import { setProfileImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusSquareFill } from "react-icons/bs";
import { BsArrowRepeat } from "react-icons/bs";
import { Front, Back } from "../shared/NicknameDummy.js";
import { getPostClones } from "react-slick/lib/utils/innerSliderUtils";
import { editProfileDB } from "../redux/modules/user";

const MypageEdit = () => {
  const dispatch = useDispatch();

  const fileInput = React.useRef();
  const getProfile = useSelector((state) => state.user.user);

  const preview = useSelector((state) => state.image.preview);

  const randomnickFront = Front;
  const randomnickBack = Back;

  const randomNick =
    randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
    " " +
    randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

  const [nickname, setNickname] = useState(
    getProfile?.nickname ? getProfile.nickname : ""
  );
  const [website1, setWebsite1] = useState(getProfile?.snsUrl[0]);
  const [website2, setWebsite2] = useState(getProfile?.snsUrl[1]);
  const [website3, setWebsite3] = useState(getProfile?.snsUrl[2]);
  const [introduce, setIntroduce] = useState(getProfile?.introduce);
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
    const file = fileInput.current.files[0];
    console.log(file);

    //새로운 객체 생성
    const formData = new FormData();

    formData.append("profileImage", file);
    formData.append("nickName", nickname);
    formData.append("snsUrl", [website1]);
    formData.append("snsUrl", [website2]);
    formData.append("snsUrl", [website3]);
    formData.append("introduce", introduce);

    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(editProfileDB(formData));
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
            src={preview ? preview : getProfile ? getProfile.profileImage : ""}
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
      <Wrap margin="0 20px">
        <Flex jc="center" padding="0 0 10px 0">
          <Text fg="1">닉네임</Text>
          <Input
            icon={<BsArrowRepeat size={28} onClick={renameRandom} />}
            square
            width="100%"
            border="1px solid #d3d3d3"
            br="6px"
            type="text"
            fg="1"
            value={nickname || ""}
            onChange={(e) => setNickname(randomNick)}
          />
        </Flex>
        {/* 닉네임 입력시 웹사이트 입력창 나오게 */}
        {/* 프로필 저장 버튼도 나타나게 */}
        <Flex jc="center" margin="10px 0">
          <Text fg="1">웹사이트</Text>
          <Flex fg="1">
            <Input
              square
              br="6px"
              type="text"
              placeholder="instagram 주소"
              value={website1 || ""}
              // icon={<BsPlusSquareFill size={28} />}
              onChange={(e) => {
                setWebsite1(e.target.value);
              }}
            />
          </Flex>
        </Flex>
        {/* 웹사이트 주소 입력시 자기소개 입력창 나오게 */}
        <Flex margin="20px 0">
          <Text fg="1"></Text>
          <Input
            square
            br="6px"
            fg="1"
            type="text"
            placeholder="Behance 주소"
            value={website2 || ""}
            // icon={<BsPlusSquare size={28} color="#555" onClick={() => {}} />}
            onChange={(e) => setWebsite2(e.target.value)}
          ></Input>
        </Flex>
        <Flex>
          <Text fg="1"></Text>
          <Input
            square
            br="6px"
            fg="1"
            type="text"
            placeholder="other website"
            value={website3 || ""}
            onChange={(e) => setWebsite3(e.target.value)}
          ></Input>
        </Flex>
        {/* Input으로 했을때는 기존 정보가 불러와지는데 Textarea로 했을때는 안 불러와져요*/}
        <Flex padding="0 0 20px 0">
          <Text fg="1">소개</Text>
          <Textarea
            fg="0"
            value={introduce || ""}
            onChange={(e) => setIntroduce(e.target.value)}
            maxLength="100"
            br="6px"
          ></Textarea>
        </Flex>
      </Wrap>
      <Button
        margin="0 20px"
        width="90%"
        onClick={() => {
          window.alert("프로필이 저장되었습니다!");
          editUser();
        }}
      >
        수정 완료
      </Button>
    </>
  );
};

const Wrapprofile = styled.div`
  position: relative;
  margin: 0 auto 20px auto;
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

export default MypageEdit;
