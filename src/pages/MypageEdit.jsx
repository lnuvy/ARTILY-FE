//마이페이지에서 수정하기를 눌렀을때 나오는 페이지 입니다
//SetProfile 페이지와 다름
//이미 설정 되어있는 프로필 정보를 불러와야 함
import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  Flex,
  Input,
  Text,
  Textarea,
  Button,
  Image,
  Wrap,
  Icon,
} from "../elements";
import { setProfileImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Front, Back } from "../shared/NicknameDummy.js";
import { editProfileDB } from "../redux/modules/user";
import { ArrowBack, Refresh, AddBox, Edit } from "../assets/icons";
import { nicknameCheck } from "../shared/regCheck/RegCheck";
import theme from "../styles/theme";

const randomnickFront = Front;
const randomnickBack = Back;

const MypageEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fileInput = useRef();

  const getProfile = useSelector((state) => state.user.user);
  const preview = useSelector((state) => state.image.preview);

  const [nickname, setNickname] = useState(
    getProfile?.nickname ? getProfile.nickname : ""
  );
  const [website1, setWebsite1] = useState(getProfile?.snsUrl[0] || "");
  const [website2, setWebsite2] = useState(getProfile?.snsUrl[1] || "");
  const [website3, setWebsite3] = useState(getProfile?.snsUrl[2] || "");
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
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setProfileImage(reader.result));
    };
  };
  const editUser = () => {
    const isValid = nicknameCheck(nickname);
    if (!isValid) return;

    const file = fileInput.current.files[0];

    //새로운 객체 생성
    const formData = new FormData();

    formData.append("profileImage", file);
    formData.append("nickname", nickname);
    formData.append("snsUrl", [website1]);
    formData.append("snsUrl", [website2]);
    formData.append("snsUrl", [website3]);
    formData.append("introduce", introduce);

    for (var pair of formData.entries()) {
    }
    dispatch(editProfileDB(formData));
  };

  return (
    <>
      <Flex padding="13px 0 0 5px">
        <Icon margin="8px" onClick={() => history.goBack()}>
          <ArrowBack />
        </Icon>
        <Text h2 bold margin="13px 0">
          프로필 수정하기
        </Text>
      </Flex>
      <Outline>
        <div className="box">
          <Wrap margin="40px 0 84px">
            <Wrapprofile>
              <Flex jc="center">
                <Image
                  alt="profile"
                  width="120px"
                  height="120px"
                  br="60px"
                  src={
                    preview
                      ? preview
                      : getProfile
                      ? getProfile.profileImage
                      : ""
                  }
                />
                <ImgBox>
                  <label htmlFor="image">
                    <Edit color="white" />
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
            <Wrap margin="0 20px">
              <Flex padding="10px 0">
                <Flex width="100%">
                  <Text textAlign="left" width="80px">
                    닉네임
                  </Text>
                  <Input
                    icon={<Refresh onClick={renameRandom} />}
                    square
                    placeholder={getProfile?.nickname || "닉네임 자리"}
                    border={`1px solid ${theme.pallete.gray1}`}
                    br="6px"
                    fg="1"
                    iconRight="4px"
                    padding="8px"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </Flex>
              </Flex>
              <Flex padding="10px 0 5px">
                <Flex width="100%">
                  <Text textAlign="left" width="80px">
                    웹사이트
                  </Text>
                  <Input
                    square
                    icon={
                      <Flex>
                        <img src="/images/Instagram.svg" alt="인스타" />
                      </Flex>
                    }
                    iconRight="4px"
                    padding="8px"
                    border={`1px solid ${theme.pallete.gray1}`}
                    fg="1"
                    br="6px"
                    type="text"
                    placeholder="instargram ID"
                    value={website1 || ""}
                    onChange={(e) => setWebsite1(e.target.value)}
                  />
                </Flex>
              </Flex>
              {/* 웹사이트 주소 입력시 자기소개 입력창 나오게 */}
              <Flex width="100%">
                <Text textAlign="left" width="80px"></Text>
                <Input
                  square
                  fg="1"
                  br="6px"
                  iconRight="4px"
                  padding="8px"
                  border={`1px solid ${theme.pallete.gray1}`}
                  icon={
                    <Flex>
                      <img src="/images/Behance.svg" alt="비핸스" />
                    </Flex>
                  }
                  type="text"
                  placeholder="Behance 주소"
                  value={website2}
                  onChange={(e) => setWebsite2(e.target.value)}
                />
              </Flex>
              <Flex padding="5px 0 10px">
                <Flex width="100%">
                  <Text textAlign="left" width="80px"></Text>
                  <Input
                    fg="1"
                    square
                    br="6px"
                    iconRight="4px"
                    padding="8px"
                    border={`1px solid ${theme.pallete.gray1}`}
                    icon={
                      <Flex>
                        <img src="/images/web.svg" alt="포트폴리오" />
                      </Flex>
                    }
                    type="text"
                    placeholder="other website"
                    value={website3 || ""}
                    onChange={(e) => setWebsite3(e.target.value)}
                  />
                </Flex>
              </Flex>
              <Flex padding="20px 0 10px 0" width="100%">
                <Text align-items="start" textAlign="left" width="80px" fg="0">
                  소개
                </Text>
                <Textarea
                  fg="1"
                  value={introduce}
                  onChange={(e) => setIntroduce(e.target.value)}
                  maxLength="50"
                  padding="8px"
                  border={`1px solid ${theme.pallete.gray1}`}
                  br="6px"
                />
              </Flex>
            </Wrap>
            <BottomWrap>
              <Button
                width="100%"
                onClick={() => {
                  editUser();
                }}
              >
                수정 완료
              </Button>
            </BottomWrap>
          </Wrap>
        </div>
      </Outline>
    </>
  );
};

const BottomWrap = styled.div`
  position: fixed;
  bottom: 0;
  padding: 16px;
  width: 100%;
  max-width: ${theme.view.maxWidth};
  background-color: white;
  height: fit-content;
`;

const Wrapprofile = styled.div`
  position: relative;
  margin: 20px auto;
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
  .image {
  }
`;
const Outline = styled.div`
  position: relative;
  .box {
    width: 100%;
  }
`;
export default MypageEdit;
