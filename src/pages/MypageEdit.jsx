//마이페이지에서 수정하기를 눌렀을때 나오는 페이지 입니다
//SetProfile 페이지와 다름
//이미 설정 되어있는 프로필 정보를 불러와야 함
import React, { useEffect, useRef, useState } from "react";
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
import { Refresh } from "../assets/icons";
import { nicknameCheck } from "../shared/regCheck/RegCheck";

const randomnickFront = Front;
const randomnickBack = Back;

const MypageEdit = () => {
  const dispatch = useDispatch();
  const fileInput = useRef();

  const getProfile = useSelector((state) => state.user.user);
  const preview = useSelector((state) => state.image.preview);

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
    const isValid = nicknameCheck(nickname);
    if (!isValid) return;

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
          />

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
        <Flex padding="10px 0">
          <Flex width="100%">
            <Flex width="30%">
              <Text>닉네임</Text>
            </Flex>
            <Flex width="70%">
              <Input
                icon={<Refresh onClick={renameRandom} />}
                square
                placeholder={getProfile?.nickname || "닉네임 자리"}
                border="1px solid #d3d3d3"
                br="6px"
                fg="1"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex padding="10px 0 5px">
          <Flex width="100%">
            <Flex width="30%">
              <Text>웹사이트</Text>
            </Flex>
            <Flex width="70%">
              <Input
                fg="1"
                square
                br="6px"
                type="text"
                placeholder="instargram 주소"
                value={website1 || ""}
                onChange={(e) => setWebsite1(e.target.value)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex padding="5px 0 5px">
          <Flex width="100%">
            <Flex width="30%">
              <Text></Text>
            </Flex>
            <Flex width="70%">
              <Input
                fg="1"
                square
                br="6px"
                type="text"
                placeholder="Behance 주소"
                value={website2}
                // icon={<BsPlusSquare size={28} color="#555" onClick={() => {}} />}
                onChange={(e) => setWebsite2(e.target.value)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex padding="5px 0 10px">
          <Flex width="100%">
            <Flex width="30%">
              <Text></Text>
            </Flex>
            <Flex width="70%">
              <Input
                fg="1"
                square
                br="6px"
                type="text"
                placeholder="other website"
                value={website3 || ""}
                onChange={(e) => setWebsite3(e.target.value)}
              />
            </Flex>
          </Flex>
        </Flex>

        {/* Input으로 했을때는 기존 정보가 불러와지는데 Textarea로 했을때는 안 불러와져요*/}
        <Flex padding="10px 0">
          <Flex width="100%">
            <Flex width="30%">
              <Text>소개</Text>
            </Flex>
            <Flex width="70%">
              <Textarea
                width="100%"
                fg="1"
                value={introduce || ""}
                onChange={(e) => setIntroduce(e.target.value)}
                maxLength="50"
                br="6px"
              />
            </Flex>
          </Flex>
        </Flex>
      </Wrap>
      <Button margin="0 20px" width="90%" onClick={editUser}>
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
